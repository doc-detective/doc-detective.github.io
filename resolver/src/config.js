const os = require("os");
const { validate } = require("doc-detective-common");
const { log, loadEnvs, replaceEnvs } = require("./utils");
const { loadDescription } = require("./openapi");

exports.setConfig = setConfig;
exports.resolveConcurrentRunners = resolveConcurrentRunners;

/**
 * Deep merge two objects, with override properties taking precedence
 * @param {Object} target - The target object to merge into
 * @param {Object} override - The override object containing properties to merge
 * @returns {Object} A new object with merged properties
 */
function deepMerge(target, override) {
  const result = { ...target };

  for (const key in override) {
    if (override.hasOwnProperty(key)) {
      if (
        override[key] != null &&
        typeof override[key] === "object" &&
        !Array.isArray(override[key])
      ) {
        // If both target and override have objects at this key, deep merge them
        if (
          result[key] != null &&
          typeof result[key] === "object" &&
          !Array.isArray(result[key])
        ) {
          result[key] = deepMerge(result[key], override[key]);
        } else {
          // If target doesn't have an object at this key, just assign the override
          result[key] = deepMerge({}, override[key]);
        }
      } else {
        // For primitive values, arrays, or null, just override
        result[key] = override[key];
      }
    }
  }

  return result;
}

// Map of Node-detected platforms to common-term equivalents
const platformMap = {
  darwin: "mac",
  linux: "linux",
  win32: "windows",
};

// List of default file type definitions
// TODO: Add defaults for all supported files
let defaultFileTypes = {
  asciidoc_1_0: {
    name: "asciidoc",
    extensions: ["adoc", "asciidoc", "asc"],
    inlineStatements: {
      testStart: ["\\/\\/\\s+\\(\\s*test\\s+([\\s\\S]*?)\\s*\\)"],
      testEnd: ["\\/\\/\\s+\\(\\s*test end\\s*\\)"],
      ignoreStart: ["\\/\\/\\s+\\(\\s*test ignore start\\s*\\)"],
      ignoreEnd: ["\\/\\/\\s+\\(\\s*test ignore end\\s*\\)"],
      step: ["\\/\\/\\s+\\(\\s*step\\s+([\\s\\S]*?)\\s*\\)"],
    },
    markup: [],
  },
  html_1_0: {
    name: "html",
    extensions: ["html", "htm"],
    inlineStatements: {
      testStart: ["<!--\\s*test\\s+?([\\s\\S]*?)\\s*-->"],
      testEnd: ["<!--\\s*test end\\s*([\\s\\S]*?)\\s*-->"],
      ignoreStart: ["<!--\\s*test ignore start\\s*-->"],
      ignoreEnd: ["<!--\\s*test ignore end\\s*-->"],
      step: ["<!--\\s*step\\s+?([\\s\\S]*?)\\s*-->"],
    },
    markup: [],
  },
  markdown_1_0: {
    name: "markdown",
    extensions: ["md", "markdown", "mdx"],
    inlineStatements: {
      testStart: [
        "{\\/\\*\\s*test\\s+?([\\s\\S]*?)\\s*\\*\\/}",
        "<!--\\s*test\\s*([\\s\\S]*?)\\s*-->",
        "\\[comment\\]:\\s+#\\s+\\(test\\s*(.*?)\\s*\\)",
        "\\[comment\\]:\\s+#\\s+\\(test start\\s*(.*?)\\s*\\)",
      ],
      testEnd: [
        "{\\/\\*\\s*test end\\s*\\*\\/}",
        "<!--\\s*test end\\s*([\\s\\S]*?)\\s*-->",
        "\\[comment\\]:\\s+#\\s+\\(test end\\)",
      ],
      ignoreStart: [
        "{\\/\\*\\s*test ignore start\\s*\\*\\/}",
        "<!--\\s*test ignore start\\s*-->",
      ],
      ignoreEnd: [
        "{\\/\\*\\s*test ignore end\\s*\\*\\/}",
        "<!--\\s*test ignore end\\s*-->",
      ],
      step: [
        "{\\/\\*\\s*step\\s+?([\\s\\S]*?)\\s*\\*\\/}",
        "<!--\\s*step\\s*([\\s\\S]*?)\\s*-->",
        "\\[comment\\]:\\s+#\\s+\\(step\\s*(.*?)\\s*\\)",
      ],
    },
    markup: [
      {
        name: "checkHyperlink",
        regex: [
          '(?<!\\!)\\[[^\\]]+\\]\\(\\s*(https?:\\/\\/[^\\s)]+)(?:\\s+"[^"]*")?\\s*\\)',
        ],
        actions: ["checkLink"],
      },
      {
        name: "clickOnscreenText",
        regex: [
          "\\b(?:[Cc]lick|[Tt]ap|[Ll]eft-click|[Cc]hoose|[Ss]elect|[Cc]heck)\\b\\s+\\*\\*((?:(?!\\*\\*).)+)\\*\\*",
        ],
        actions: ["click"],
      },
      {
        name: "findOnscreenText",
        regex: ["\\*\\*((?:(?!\\*\\*).)+)\\*\\*"],
        actions: ["find"],
      },
      {
        name: "goToUrl",
        regex: [
          '\\b(?:[Gg]o\\s+to|[Oo]pen|[Nn]avigate\\s+to|[Vv]isit|[Aa]ccess|[Pp]roceed\\s+to|[Ll]aunch)\\b\\s+\\[[^\\]]+\\]\\(\\s*(https?:\\/\\/[^\\s)]+)(?:\\s+"[^"]*")?\\s*\\)',
        ],
        actions: ["goTo"],
      },
      {
        name: "screenshotImage",
        regex: [
          '!\\[[^\\]]*\\]\\(\\s*([^\\s)]+)(?:\\s+"[^"]*")?\\s*\\)\\s*\\{(?=[^}]*\\.screenshot)[^}]*\\}',
        ],
        actions: ["screenshot"],
      },
      {
        name: "typeText",
        regex: ['\\b(?:press|enter|type)\\b\\s+"([^"]+)"'],
        actions: ["type"],
      },
      {
        name: "httpRequestFormat",
        regex: [
          "```(?:http)?\\r?\\n([A-Z]+)\\s+([^\\s]+)(?:\\s+HTTP\\/[\\d.]+)?\\r?\\n((?:[^\\s]+:\\s+[^\\s]+\\r?\\n)*)?(?:\\s+([\\s\\S]*?)\\r?\\n+)?```",
        ],
        actions: [
          {
            httpRequest: {
              method: "$1",
              url: "$2",
              request: {
                headers: "$3",
                body: "$4",
              },
            },
          },
        ],
      },
      {
        name: "runCode",
        regex: [
          "```(bash|python|py|javascript|js)(?![^\\r\\n]*testIgnore)[^\\r\\n]*\\r?\\n([\\s\\S]*?)\\r?\\n```",
        ],
        actions: [
          {
            unsafe: true,
            // This is unsafe because it runs arbitrary code, so it should be used with caution.
            // It is recommended to use this only in trusted environments or with trusted inputs.
            runCode: {
              language: "$1",
              code: "$2",
            },
          },
        ],
      },
    ],
  },
};
// Set keyword versions
defaultFileTypes = {
  ...defaultFileTypes,
  markdown: defaultFileTypes.markdown_1_0,
  asciidoc: defaultFileTypes.asciidoc_1_0,
  html: defaultFileTypes.html_1_0,
};

/**
 * Resolves the concurrentRunners configuration value from various input formats
 * to a concrete integer for the core execution engine.
 * 
 * @param {Object} config - The configuration object
 * @returns {number} The resolved concurrent runners value
 */
function resolveConcurrentRunners(config) {
  if (config.concurrentRunners === true) {
    // Cap at 4 only for the boolean convenience option
    return Math.min(os.cpus().length, 4);
  }
  // Respect explicit numeric values and default
  return config.concurrentRunners || 1;
}

/**
 * Sets up and validates the configuration object for Doc Detective
 * @async
 * @param {Object} config - The configuration object to process
 * @returns {Promise<Object>} The processed and validated configuration object
 * @throws Will exit process with code 1 if configuration is invalid
 */
async function setConfig({ config }) {
  // Set environment variables from file
  if (config.loadVariables) await loadEnvs(config.loadVariables);

  // Load environment variables for `config`
  config = replaceEnvs(config);

  // Apply config overrides from DOC_DETECTIVE environment variable
  if (process.env.DOC_DETECTIVE) {
    try {
      const docDetectiveEnv = JSON.parse(process.env.DOC_DETECTIVE);
      if (
        docDetectiveEnv.config &&
        typeof docDetectiveEnv.config === "object"
      ) {
        // Apply config overrides using deep merge to preserve nested properties
        config = deepMerge(config, docDetectiveEnv.config);
      }
    } catch (error) {
      log(
        config,
        "warn",
        `Invalid JSON in DOC_DETECTIVE environment variable: ${error.message}. Ignoring config overrides.`
      );
    }
  }

  // Validate inbound `config`.
  const validityCheck = validate({ schemaKey: "config_v3", object: config });
  if (!validityCheck.valid) {
    // TODO: Improve error message reporting.
    log(
      config,
      "error",
      `Invalid config object: ${validityCheck.errors}. Exiting.`
    );
    throw new Error(`Invalid config object: ${validityCheck.errors}. Exiting.`);
  }
  config = validityCheck.object;

  // Replace fileType strings with objects
  config.fileTypes = config.fileTypes.map((fileType) => {
    if (typeof fileType === "object") return fileType;
    const fileTypeObject = defaultFileTypes[fileType];
    if (typeof fileTypeObject !== "undefined") return fileTypeObject;
    log(
      config,
      "error",
      `Invalid config. "${fileType}" isn't a valid fileType value.`
    );
    throw new Error(
      `Invalid config. "${fileType}" isn't a valid fileType value.`
    );
  });

  // TODO: Combine extended fileTypes with overrides

  // Standardize value formats
  if (typeof config.input === "string") config.input = [config.input];
  if (typeof config.beforeAny === "string") {
    if (config.beforeAny === "") {
      config.beforeAny = [];
    } else {
      config.beforeAny = [config.beforeAny];
    }
  }
  if (typeof config.afterAll === "string") {
    if (config.afterAll === "") {
      config.afterAll = [];
    } else {
      config.afterAll = [config.afterAll];
    }
  }
  if (typeof config.fileTypes === "string") {
    config.fileTypes = [config.fileTypes];
  }
  config.fileTypes = config.fileTypes.map((fileType) => {
    if (fileType.inlineStatements) {
      if (typeof fileType.inlineStatements.testStart === "string")
        fileType.inlineStatements.testStart = [
          fileType.inlineStatements.testStart,
        ];
      if (typeof fileType.inlineStatements.testEnd === "string")
        fileType.inlineStatements.testEnd = [fileType.inlineStatements.testEnd];
      if (typeof fileType.inlineStatements.ignoreStart === "string")
        fileType.inlineStatements.ignoreStart = [
          fileType.inlineStatements.ignoreStart,
        ];
      if (typeof fileType.inlineStatements.ignoreEnd === "string")
        fileType.inlineStatements.ignoreEnd = [
          fileType.inlineStatements.ignoreEnd,
        ];
      if (typeof fileType.inlineStatements.step === "string")
        fileType.inlineStatements.step = [fileType.inlineStatements.step];
    }
    if (fileType.markup) {
      fileType.markup = fileType.markup.map((markup) => {
        if (typeof markup?.regex === "string") markup.regex = [markup.regex];
        return markup;
      });
    }
    if (fileType.extends) {
      // If fileType extends another, merge the properties
      const extendedFileTypeRaw = defaultFileTypes[fileType.extends];
      if (!extendedFileTypeRaw) {
        log(
          config,
          "error",
          'Invalid config. fileType.extends references unknown fileType definition: "' +
            fileType.extends +
            '".'
        );
        throw new Error(
          'Invalid config. fileType.extends references unknown fileType definition: "' +
            fileType.extends +
            '".'
        );
      }
      const extendedFileType = JSON.parse(JSON.stringify(extendedFileTypeRaw));
      if (extendedFileType) {
        if (!fileType.name) {
          fileType.name = extendedFileType.name;
        }

        // Merge extensions
        if (extendedFileType?.extensions) {
          fileType.extensions = [
            ...new Set([
              ...(extendedFileType.extensions || []),
              ...(fileType.extensions || []),
            ]),
          ];
        }

        // Merge property values for inlineStatements children
        if (extendedFileType?.inlineStatements) {
          if (fileType.inlineStatements === undefined) {
            fileType.inlineStatements = {};
          }
          // Merge each inlineStatements property using Set to ensure uniqueness
          const keys = [
            "testStart",
            "testEnd",
            "ignoreStart",
            "ignoreEnd",
            "step",
          ];
          for (const key of keys) {
            if (
              extendedFileType?.inlineStatements?.[key] ||
              fileType?.inlineStatements?.[key]
            ) {
              fileType.inlineStatements[key] = [
                ...new Set([
                  ...(extendedFileType?.inlineStatements?.[key] || []),
                  ...(fileType?.inlineStatements?.[key] || []),
                ]),
              ];
            }
          }
        }

        // Merge property values for markup array, overwriting when `name` matches
        if (extendedFileType?.markup) {
          fileType.markup = fileType.markup || [];
          extendedFileType.markup.forEach((extendedMarkup) => {
            const existingMarkupIndex = fileType.markup.findIndex(
              (markup) => markup.name === extendedMarkup.name
            );
            if (existingMarkupIndex === -1) {
              // Add to markup array
              fileType.markup.push(extendedMarkup);
            }
          });
        }
      }
    }

    return fileType;
  });

  // Detect current environment.
  config.environment = getEnvironment();
  
  // Resolve concurrent runners configuration
  config.concurrentRunners = resolveConcurrentRunners(config);
  
  // TODO: Revise loadDescriptions() so it doesn't mutate the input but instead returns an updated object
  await loadDescriptions(config);

  return config;
}

/**
 * Loads OpenAPI descriptions for all configured OpenAPI integrations.
 *
 * @async
 * @param {Object} config - The configuration object.
 * @returns {Promise<void>} - A promise that resolves when all descriptions are loaded.
 *
 * @remarks
 * This function modifies the input config object by:
 * 1. Adding a 'definition' property to each OpenAPI configuration with the loaded description.
 * 2. Removing any OpenAPI configurations where the description failed to load.
 */
async function loadDescriptions(config) {
  if (config?.integrations?.openApi) {
    for (const openApiConfig of config.integrations.openApi) {
      try {
        openApiConfig.definition = await loadDescription(
          openApiConfig.descriptionPath
        );
      } catch (error) {
        log(
          config,
          "error",
          `Failed to load OpenAPI description from ${openApiConfig.descriptionPath}: ${error.message}`
        );
        // Remove the failed OpenAPI configuration
        config.integrations.openApi = config.integrations.openApi.filter(
          (item) => item !== openApiConfig
        );
      }
    }
  }
}

// Detect aspects of the environment running Doc Detective.
function getEnvironment() {
  const environment = {};
  // Detect system architecture
  environment.arch = os.arch();
  // Detect system platform
  environment.platform = platformMap[process.platform];
  // Detect working directory
  environment.workingDirectory = process.cwd();
  return environment;
}
