const fs = require("fs");
const os = require("os");
const crypto = require("crypto");
const YAML = require("yaml");
const axios = require("axios");
const path = require("path");
const uuid = require("uuid");
const { spawn } = require("child_process");
const {
  validate,
  resolvePaths,
  transformToSchemaKey,
  readFile,
} = require("doc-detective-common");

exports.qualifyFiles = qualifyFiles;
exports.parseTests = parseTests;
exports.outputResults = outputResults;
exports.loadEnvs = loadEnvs;
exports.log = log;
exports.timestamp = timestamp;
exports.replaceEnvs = replaceEnvs;
exports.spawnCommand = spawnCommand;
exports.inContainer = inContainer;
exports.cleanTemp = cleanTemp;
exports.calculatePercentageDifference = calculatePercentageDifference;
exports.fetchFile = fetchFile;
exports.isRelativeUrl = isRelativeUrl;

function isRelativeUrl(url) {
  try {
    new URL(url);
    // If no error is thrown, it's a complete URL
    return false;
  } catch (error) {
    // If URL constructor throws an error, it's a relative URL
    return true;
  }
}

// Parse a JSON or YAML object
function parseObject({ stringifiedObject }) {
  if (typeof stringifiedObject === "string") {
    // If string, try to parse as JSON or YAML
    try {
      const json = JSON.parse(stringifiedObject);
      return json;
    } catch (jsonError) {
      try {
        const yaml = YAML.parse(stringifiedObject);
        return yaml;
      } catch (yamlError) {
        throw new Error("Invalid JSON or YAML format");
      }
    }
  }
  return stringifiedObject;
}

// Delete all contents of doc-detective temp directory
function cleanTemp() {
  const tempDir = `${os.tmpdir}/doc-detective`;
  if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach((file) => {
      const curPath = `${tempDir}/${file}`;
      fs.unlinkSync(curPath);
    });
  }
}

// Fetch a file from a URL and save to a temp directory
// If the file is not JSON, return the contents as a string
// If the file is not found, return an error
async function fetchFile(fileURL) {
  try {
    const response = await axios.get(fileURL);
    if (typeof response.data === "object") {
      response.data = JSON.stringify(response.data, null, 2);
    } else {
      response.data = response.data.toString();
    }
    const fileName = fileURL.split("/").pop();
    const hash = crypto.createHash("md5").update(response.data).digest("hex");
    const filePath = `${os.tmpdir}/doc-detective/${hash}_${fileName}`;
    // If doc-detective temp directory doesn't exist, create it
    if (!fs.existsSync(`${os.tmpdir}/doc-detective`)) {
      fs.mkdirSync(`${os.tmpdir}/doc-detective`);
    }
    // If file doesn't exist, write it
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, response.data);
    }
    return { result: "success", path: filePath };
  } catch (error) {
    return { result: "error", message: error };
  }
}

// Inspect and qualify files as valid inputs
async function qualifyFiles({ config }) {
  let dirs = [];
  let files = [];
  let sequence = [];

  // Determine source sequence
  const setup = config.beforeAny;
  if (setup) sequence = sequence.concat(setup);
  const input = config.input;
  sequence = sequence.concat(input);
  const cleanup = config.afterAll;
  if (cleanup) sequence = sequence.concat(cleanup);

  for (let source of sequence) {
    log(config, "debug", `source: ${source}`);
    // Check if source is a URL
    let isURL = source.startsWith("http://") || source.startsWith("https://");
    // If URL, fetch file and place in temp directory
    if (isURL) {
      const fetch = await fetchFile(source);
      if (fetch.result === "error") {
        log(config, "warning", fetch.message);
        continue;
      }
      source = fetch.path;
    }
    // Check if source is a file or directory
    let isFile = fs.statSync(source).isFile();
    let isDir = fs.statSync(source).isDirectory();

    // Parse input
    if (isFile && (await isValidSourceFile({ config, files, source }))) {
      // Passes all checks
      files.push(path.resolve(source));
    } else if (isDir) {
      // Load files from directory
      dirs = [];
      dirs[0] = source;
      for (const dir of dirs) {
        const objects = fs.readdirSync(dir);
        for (const object of objects) {
          const content = path.resolve(dir + "/" + object);
          // Exclude node_modules for local installs
          if (content.includes("node_modules")) continue;
          // Check if file or directory
          const isFile = fs.statSync(content).isFile();
          const isDir = fs.statSync(content).isDirectory();
          // Add to files or dirs array
          if (
            isFile &&
            (await isValidSourceFile({ config, files, source: content }))
          ) {
            files.push(path.resolve(content));
          } else if (isDir && config.recursive) {
            // recursive set to true
            dirs.push(content);
          }
        }
      }
    }
  }
  return files;
}

// Check if a source file is valid based on fileType definitions
async function isValidSourceFile({ config, files, source }) {
  log(config, "debug", `validation: ${source}`);
  // Determine allowed extensions
  let allowedExtensions = ["json", "yaml", "yml"];
  config.fileTypes.forEach((fileType) => {
    allowedExtensions = allowedExtensions.concat(fileType.extensions);
  });
  // Is present in files array already
  if (files.indexOf(source) >= 0) return false;
  // Is JSON or YAML but isn't a valid spec-formatted JSON object
  if (
    path.extname(source) === ".json" ||
    path.extname(source) === ".yaml" ||
    path.extname(source) === ".yml"
  ) {
    const content = await readFile({ fileURLOrPath: source });
    if (typeof content !== "object") {
      log(
        config,
        "debug",
        `${source} isn't a valid test specification. Skipping.`
      );
      return false;
    }
    const validation = validate({
      schemaKey: "spec_v3",
      object: content,
      addDefaults: false,
    });
    if (!validation.valid) {
      log(config, "warning", validation);
      log(
        config,
        "warning",
        `${source} isn't a valid test specification. Skipping.`
      );
      return false;
    }
    // TODO: Move `before` and `after checking out of is and into a broader test validation function
    // If any objects in `tests` array have `before` or `after` property, make sure those files exist
    for (const test of content.tests) {
      if (test.before) {
        let beforePath = "";
        if (config.relativePathBase === "file") {
          beforePath = path.resolve(path.dirname(source), test.before);
        } else {
          beforePath = path.resolve(test.before);
        }
        if (!fs.existsSync(beforePath)) {
          log(
            config,
            "debug",
            `${beforePath} is specified to run before a test but isn't a valid file. Skipping ${source}.`
          );
          return false;
        }
      }
      if (test.after) {
        let afterPath = "";
        if (config.relativePathBase === "file") {
          afterPath = path.resolve(path.dirname(source), test.after);
        } else {
          afterPath = path.resolve(test.after);
        }
        if (!fs.existsSync(afterPath)) {
          log(
            config,
            "debug",
            `${afterPath} is specified to run after a test but isn't a valid file. Skipping ${source}.`
          );
          return false;
        }
      }
    }
  }
  // If extension isn't in list of allowed extensions
  const extension = path.extname(source).substring(1);
  if (!allowedExtensions.includes(extension)) {
    log(
      config,
      "debug",
      `${source} extension isn't specified in a \`config.fileTypes\` object. Skipping.`
    );
    return false;
  }

  return true;
}

/**
 * Parses raw test content into an array of structured test objects.
 *
 * Processes input content using inline statement and markup regex patterns defined by {@link fileType}, extracting test and step definitions. Supports detection of test boundaries, ignored sections, and step definitions, including batch markup matches. Converts and validates extracted objects against the test and step schemas, handling both v2 and v3 formats. Returns an array of validated test objects with their associated steps.
 *
 * @param {Object} options - Options for parsing.
 * @param {Object} options.config - Test configuration object.
 * @param {string|Object} options.content - Raw file content as a string or object.
 * @param {string} options.filePath - Path to the file being parsed.
 * @param {Object} options.fileType - File type definition containing parsing rules.
 * @returns {Array<Object>} Array of parsed and validated test objects.
 */
async function parseContent({ config, content, filePath, fileType }) {
  const statements = [];
  const statementTypes = [
    "testStart",
    "testEnd",
    "ignoreStart",
    "ignoreEnd",
    "step",
  ];

  function findTest({ tests, testId }) {
    let test = tests.find((test) => test.testId === testId);
    if (!test) {
      test = { testId, steps: [] };
      tests.push(test);
    }
    return test;
  }

  function replaceNumericVariables(stringOrObjectSource, values) {
    let stringOrObject = JSON.parse(JSON.stringify(stringOrObjectSource));
    if (
      typeof stringOrObject !== "string" &&
      typeof stringOrObject !== "object"
    ) {
      throw new Error("Invalid stringOrObject type");
    }
    if (typeof values !== "object") {
      throw new Error("Invalid values type");
    }

    if (typeof stringOrObject === "string") {
      // Replace $n with values[n]
      // Find all $n variables in the string
      const matches = stringOrObject.match(/\$[0-9]+/g);
      if (matches) {
        // Check if all variables exist in values
        const allExist = matches.every((variable) => {
          const index = variable.substring(1);
          return (
            Object.hasOwn(values, index) && typeof values[index] !== "undefined"
          );
        });
        if (!allExist) {
          return null;
        } else {
          // Perform substitution
          stringOrObject = stringOrObject.replace(/\$[0-9]+/g, (variable) => {
            const index = variable.substring(1);
            return values[index];
          });
        }
      }
    }

    Object.keys(stringOrObject).forEach((key) => {
      if (typeof stringOrObject[key] === "object") {
        // Iterate through object and recursively resolve variables
        stringOrObject[key] = replaceNumericVariables(
          stringOrObject[key],
          values
        );
      } else if (typeof stringOrObject[key] === "string") {
        // Replace $n with values[n]
        const matches = stringOrObject[key].match(/\$[0-9]+/g);
        if (matches) {
          // Check if all variables exist in values
          const allExist = matches.every((variable) => {
            const index = variable.substring(1);
            return (
              Object.hasOwn(values, index) &&
              typeof values[index] !== "undefined"
            );
          });
          if (!allExist) {
            delete stringOrObject[key];
          } else {
            // Perform substitution
            stringOrObject[key] = stringOrObject[key].replace(
              /\$[0-9]+/g,
              (variable) => {
                const index = variable.substring(1);
                return values[index];
              }
            );
          }
        }
      }
      return key;
    });
    return stringOrObject;
  }

  // Test for each statement type
  statementTypes.forEach((statementType) => {
    // If inline statements aren't defined, skip
    if (
      typeof fileType.inlineStatements === "undefined" ||
      typeof fileType.inlineStatements[statementType] === "undefined"
    )
      return;
    // Check if fileType has inline statements
    fileType.inlineStatements[statementType].forEach((statementRegex) => {
      const regex = new RegExp(statementRegex, "g");
      const matches = [...content.matchAll(regex)];
      matches.forEach((match) => {
        // Add 'type' property to each match
        match.type = statementType;
        // Add 'sortIndex' property to each match
        match.sortIndex = match[1]
          ? match.index + match[1].length
          : match.index;
      });
      statements.push(...matches);
    });
  });

  if (config.detectSteps && fileType.markup) {
    fileType.markup.forEach((markup) => {
      markup.regex.forEach((pattern) => {
        const regex = new RegExp(pattern, "g");
        const matches = [...content.matchAll(regex)];
        if (matches.length > 0 && markup.batchMatches) {
          // Combine all matches into a single match
          const combinedMatch = {
            1: matches.map((match) => match[1] || match[0]).join(os.EOL),
            type: "detectedStep",
            markup: markup,
            sortIndex: Math.min(...matches.map((match) => match.index)),
          };
          statements.push(combinedMatch);
        } else if (matches.length > 0) {
          matches.forEach((match) => {
            // Add 'type' property to each match
            match.type = "detectedStep";
            match.markup = markup;
            // Add 'sortIndex' property to each match
            match.sortIndex = match[1]
              ? match.index + match[1].length
              : match.index;
          });
          statements.push(...matches);
        }
      });
    });
  }

  // Sort statements by index
  statements.sort((a, b) => a.sortIndex - b.sortIndex);

  // TODO: Split above into a separate function

  // Process statements into tests and steps
  let tests = [];
  let testId = `${uuid.v4()}`;
  let ignore = false;
  let currentIndex = 0;

  statements.forEach((statement) => {
    let test = "";
    let statementContent = "";
    let stepsCleanup = false;
    currentIndex = statement.sortIndex;
    switch (statement.type) {
      case "testStart":
        // Test start statement
        statementContent = statement[1] || statement[0];
        test = parseObject({ stringifiedObject: statementContent });

        // If v2 schema, convert to v3
        if (test.id || test.file || test.setup || test.cleanup) {
          // Add temporary step to pass validation
          if (!test.steps) {
            test.steps = [{ action: "goTo", url: "https://doc-detective.com" }];
            stepsCleanup = true;
          }
          test = transformToSchemaKey({
            object: test,
            currentSchema: "test_v2",
            targetSchema: "test_v3",
          });
          // Remove temporary step
          if (stepsCleanup) {
            test.steps = [];
            stepsCleanup = false;
          }
        }

        if (test.testId) {
          // If the testId already exists, update the variable
          testId = `${test.testId}`;
        } else {
          // If the testId doesn't exist, set it
          test.testId = `${testId}`;
        }
        if (!test.steps) {
          // If the test doesn't have steps, add an empty array
          test.steps = [];
        }
        tests.push(test);
        break;
      case "testEnd":
        // Test end statement
        testId = `${uuid.v4()}`;
        ignore = false;
        break;
      case "ignoreStart":
        // Ignore start statement
        ignore = true;
        break;
      case "ignoreEnd":
        // Ignore end statement
        ignore = false;
        break;
      case "detectedStep":
        // Transform detected content into a step
        test = findTest({ tests, testId });
        if (typeof test.detectSteps !== "undefined" && !test.detectSteps) {
          break;
        }
        if (statement?.markup?.actions) {
          statement.markup.actions.forEach((action) => {
            let step = {};
            if (typeof action === "string") {
              if (action === "runCode") return;
              // If action is string, build step using simple syntax
              step[action] = statement[1] || statement[0];
              if (
                config.origin &&
                (action === "goTo" || action === "checkLink")
              ) {
                step[action].origin = config.origin;
              }
            } else {
              // Substitute variables $n with match[n]
              // TODO: Make key substitution recursive
              step = replaceNumericVariables(action, statement);
            }

            // Normalize step field formats
            if (step.httpRequest) {
              // Parse headers from line-separated string values
              // Example string: "Content-Type: application/json\nAuthorization: Bearer token"
              if (typeof step.httpRequest.request.headers === "string") {
                try {
                  const headers = {};
                  step.httpRequest.request.headers
                    .split("\n")
                    .forEach((header) => {
                      const colonIndex = header.indexOf(":");
                      if (colonIndex === -1) return;
                      const key = header.substring(0, colonIndex).trim();
                      const value = header.substring(colonIndex + 1).trim();
                      if (key && value) {
                        headers[key] = value;
                      }
                    });
                  step.httpRequest.request.headers = headers;
                } catch (error) {}
              }
              // Parse JSON-as-string body
              if (
                typeof step.httpRequest.request.body === "string" &&
                (step.httpRequest.request.body.trim().startsWith("{") ||
                  step.httpRequest.request.body.trim().startsWith("["))
              ) {
                try {
                  step.httpRequest.request.body = JSON.parse(
                    step.httpRequest.request.body
                  );
                } catch (error) {}
              }
            }

            // Make sure is valid v3 step schema
            const valid = validate({
              schemaKey: "step_v3",
              object: step,
              addDefaults: false,
            });
            if (!valid) {
              log(
                config,
                "warning",
                `Step ${JSON.stringify(step)} isn't a valid step. Skipping.`
              );
              return false;
            }
            step = valid.object;
            test.steps.push(step);
          });
        }
        break;
      case "step":
        // Step statement
        test = findTest({ tests, testId });
        statementContent = statement[1] || statement[0];
        let step = parseObject({ stringifiedObject: statementContent });
        // Make sure is valid v3 step schema
        const validation = validate({
          schemaKey: "step_v3",
          object: step,
          addDefaults: false,
        });
        if (!validation.valid) {
          log(
            config,
            "warning",
            `Step ${JSON.stringify(step)} isn't a valid step. Skipping.`
          );
          return false;
        }
        step = validation.object;
        test.steps.push(step);
        break;
      default:
        break;
    }
  });

  tests.forEach((test) => {
    // Validate test object
    const validation = validate({
      schemaKey: "test_v3",
      object: test,
      addDefaults: false,
    });
    if (!validation.valid) {
      log(
        config,
        "warning",
        `Couldn't convert some steps in ${filePath} to a valid test. Skipping. Errors: ${validation.errors}`
      );
      return false;
    }
    test = validation.object;
  });

  return tests;
}

// Parse files for tests
async function parseTests({ config, files }) {
  let specs = [];

  // Loop through files
  for (const file of files) {
    log(config, "debug", `file: ${file}`);
    const extension = path.extname(file).slice(1);
    let content = "";
    content = await readFile({ fileURLOrPath: file });

    if (typeof content === "object") {
      // Resolve to catch any relative setup or cleanup paths
      content = await resolvePaths({
        config: config,
        object: content,
        filePath: file,
      });

      for (const test of content.tests) {
        // If any objects in `tests` array have `before` property, add `tests[0].steps` of before to the beginning of the object's `steps` array.
        if (test.before) {
          const setup = await readFile({ fileURLOrPath: test.before });
          test.steps = setup.tests[0].steps.concat(test.steps);
        }
        // If any objects in `tests` array have `after` property, add `tests[0].steps` of after to the end of the object's `steps` array.
        if (test.after) {
          const cleanup = await readFile({ fileURLOrPath: test.after });
          test.steps = test.steps.concat(cleanup.tests[0].steps);
        }
      }
      // Validate each step
      for (const test of content.tests) {
        // Filter out steps that don't pass validation
        test.steps.forEach((step) => {
          const validation = validate({
            schemaKey: `step_v3`,
            object: { ...step },
            addDefaults: false,
          });
          if (!validation.valid) {
            log(
              config,
              "warning",
              `Step ${step} isn't a valid step. Skipping.`
            );
            return false;
          }
          return true;
        });
      }
      const validation = validate({
        schemaKey: "spec_v3",
        object: content,
        addDefaults: false,
      });
      if (!validation.valid) {
        log(config, "warning", validation);
        log(
          config,
          "warning",
          `After applying setup and cleanup steps, ${file} isn't a valid test specification. Skipping.`
        );
        return false;
      }
      // Make sure that object is now a valid v3 spec
      content = validation.object;
      // Resolve previously unapplied defaults
      content = await resolvePaths({
        config: config,
        object: content,
        filePath: file,
      });
      specs.push(content);
    } else {
      // Process non-object
      let id = `${uuid.v4()}`;
      let spec = { specId: id, contentPath: file, tests: [] };
      const fileType = config.fileTypes.find((fileType) =>
        fileType.extensions.includes(extension)
      );

      // Process executables
      if (fileType.runShell) {
        // Substitute all instances of $1 with the file path
        let runShell = JSON.stringify(fileType.runShell);
        runShell = runShell.replace(/\$1/g, file);
        runShell = JSON.parse(runShell);

        const test = {
          steps: [
            {
              runShell,
            },
          ],
        };

        // Validate test
        const validation = validate({
          schemaKey: "test_v3",
          object: test,
          addDefaults: false,
        });
        if (!validation.valid) {
          log(
            config,
            "warning",
            `Failed to convert ${file} to a runShell step: ${validation.errors}. Skipping.`
          );
          continue;
        }

        spec.tests.push(test);
        continue;
      }

      // Process content
      const tests = await parseContent({
        config: config,
        content: content,
        fileType: fileType,
        filePath: file,
      });
      spec.tests.push(...tests);

      // Remove tests with no steps
      spec.tests = spec.tests.filter(
        (test) => test.steps && test.steps.length > 0
      );

      // Push spec to specs, if it is valid
      const validation = validate({
        schemaKey: "spec_v3",
        object: spec,
        addDefaults: false,
      });
      if (!validation.valid) {
        log(
          config,
          "warning",
          `Tests from ${file} don't create a valid test specification. Skipping.`
        );
      } else {
        // Resolve paths
        spec = await resolvePaths({
          config: config,
          object: spec,
          filePath: file,
        });
        specs.push(spec);
      }
    }
  }
  return specs;
}

async function outputResults(path, results, config) {
  let data = JSON.stringify(results, null, 2);
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
  });
  log(config, "info", "RESULTS:");
  log(config, "info", results);
  log(config, "info", `See results at ${path}`);
  log(config, "info", "Cleaning up and finishing post-processing.");
}

/**
 * Loads environment variables from a specified .env file.
 *
 * @async
 * @param {string} envsFile - Path to the environment variables file.
 * @returns {Promise<Object>} An object containing the operation result.
 * @returns {string} returns.status - "PASS" if environment variables were loaded successfully, "FAIL" otherwise.
 * @returns {string} returns.description - A description of the operation result.
 */
async function loadEnvs(envsFile) {
  const fileExists = fs.existsSync(envsFile);
  if (fileExists) {
    require("dotenv").config({ path: envsFile, override: true });
    return { status: "PASS", description: "Envs set." };
  } else {
    return { status: "FAIL", description: "Invalid file." };
  }
}

async function log(config, level, message) {
  let logLevelMatch = false;
  if (config.logLevel === "error" && level === "error") {
    logLevelMatch = true;
  } else if (
    config.logLevel === "warning" &&
    (level === "error" || level === "warning")
  ) {
    logLevelMatch = true;
  } else if (
    config.logLevel === "info" &&
    (level === "error" || level === "warning" || level === "info")
  ) {
    logLevelMatch = true;
  } else if (
    config.logLevel === "debug" &&
    (level === "error" ||
      level === "warning" ||
      level === "info" ||
      level === "debug")
  ) {
    logLevelMatch = true;
  }

  if (logLevelMatch) {
    if (typeof message === "string") {
      let logMessage = `(${level.toUpperCase()}) ${message}`;
      console.log(logMessage);
    } else if (typeof message === "object") {
      let logMessage = `(${level.toUpperCase()})`;
      console.log(logMessage);
      console.log(JSON.stringify(message, null, 2));
    }
  }
}

function replaceEnvs(stringOrObject) {
  if (!stringOrObject) return stringOrObject;
  if (typeof stringOrObject === "object") {
    // Iterate through object and recursively resolve variables
    Object.keys(stringOrObject).forEach((key) => {
      // Resolve all variables in key value
      stringOrObject[key] = replaceEnvs(stringOrObject[key]);
    });
  } else if (typeof stringOrObject === "string") {
    // Load variable from string
    variableRegex = new RegExp(/\$[a-zA-Z0-9_]+/, "g");
    matches = stringOrObject.match(variableRegex);
    // If no matches, return string
    if (!matches) return stringOrObject;
    // Iterate matches
    matches.forEach((match) => {
      // Check if is declared variable
      value = process.env[match.substring(1)];
      if (value) {
        // If match is the entire string instead of just being a substring, try to convert value to object
        try {
          if (
            match.length === stringOrObject.length &&
            typeof JSON.parse(stringOrObject) === "object"
          ) {
            value = JSON.parse(value);
          }
        } catch {}
        // Attempt to load additional variables in value
        value = replaceEnvs(value);
        // Replace match with variable value
        if (typeof value === "string") {
          // Replace match with value. Supports whole- and sub-string matches.
          stringOrObject = stringOrObject.replace(match, value);
        } else if (typeof value === "object") {
          // If value is an object, replace match with object
          stringOrObject = value;
        }
      }
    });
  }
  return stringOrObject;
}

function timestamp() {
  let timestamp = new Date();
  return `${timestamp.getFullYear()}${("0" + (timestamp.getMonth() + 1)).slice(
    -2
  )}${("0" + timestamp.getDate()).slice(-2)}-${(
    "0" + timestamp.getHours()
  ).slice(-2)}${("0" + timestamp.getMinutes()).slice(-2)}${(
    "0" + timestamp.getSeconds()
  ).slice(-2)}`;
}

// Perform a native command in the current working directory.
/**
 * Executes a command in a child process using the `spawn` function from the `child_process` module.
 * @param {string} cmd - The command to execute.
 * @param {string[]} args - The arguments to pass to the command.
 * @param {object} options - The options for the command execution.
 * @param {boolean} options.workingDirectory - Directory in which to execute the command.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * @returns {Promise<object>} A promise that resolves to an object containing the stdout, stderr, and exit code of the command.
 */
async function spawnCommand(cmd, args = [], options) {
  // Set default options
  if (!options) options = {};

  // Set shell (bash/cmd) based on OS
  let shell = "bash";
  let command = ["-c"];
  if (process.platform === "win32") {
    shell = "cmd";
    command = ["/c"];
  }

  // Combine command and arguments
  let fullCommand = [cmd, ...args].join(" ");
  command.push(fullCommand);

  // Set spawnOptions based on OS
  let spawnOptions = {};
  let cleanupNodeModules = false;
  if (process.platform === "win32") {
    spawnOptions.shell = true;
    spawnOptions.windowsHide = true;
  }
  if (options.cwd) {
    spawnOptions.cwd = options.cwd;
  }

  const runCommand = spawn(shell, command, spawnOptions);
  runCommand.on("error", (error) => {});

  // Capture stdout
  let stdout = "";
  for await (const chunk of runCommand.stdout) {
    stdout += chunk;
    if (options.debug) console.log(chunk.toString());
  }
  // Remove trailing newline
  stdout = stdout.replace(/\n$/, "");

  // Capture stderr
  let stderr = "";
  for await (const chunk of runCommand.stderr) {
    stderr += chunk;
    if (options.debug) console.log(chunk.toString());
  }
  // Remove trailing newline
  stderr = stderr.replace(/\n$/, "");

  // Capture exit code
  const exitCode = await new Promise((resolve, reject) => {
    runCommand.on("close", resolve);
  });

  return { stdout, stderr, exitCode };
}

async function inContainer() {
  if (process.env.IN_CONTAINER === "true") return true;
  if (process.platform === "linux") {
    result = await spawnCommand(
      `grep -sq "docker\|lxc\|kubepods" /proc/1/cgroup`
    );
    if (result.exitCode === 0) return true;
  }
  return false;
}

function calculatePercentageDifference(text1, text2) {
  const distance = llevenshteinDistance(text1, text2);
  const maxLength = Math.max(text1.length, text2.length);
  const percentageDiff = (distance / maxLength) * 100;
  return percentageDiff.toFixed(2); // Returns the percentage difference as a string with two decimal places
}

function llevenshteinDistance(s, t) {
  if (!s.length) return t.length;
  if (!t.length) return s.length;

  const arr = [];

  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
  }

  for (let j = 0; j <= s.length; j++) {
    arr[0][j] = j;
  }

  for (let i = 1; i <= t.length; i++) {
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] = Math.min(
        arr[i - 1][j] + 1, // deletion
        arr[i][j - 1] + 1, // insertion
        arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1) // substitution
      );
    }
  }

  return arr[t.length][s.length];
}
