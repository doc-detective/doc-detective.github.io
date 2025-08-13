const { schemas } = require("./schemas");
const Ajv = require("ajv");
// Ajv extra formats: https://ajv.js.org/packages/ajv-formats.html
const addFormats = require("ajv-formats");
// Ajv extra keywords: https://ajv.js.org/packages/ajv-keywords.html
const addKeywords = require("ajv-keywords");
// Ajv custom errors: https://ajv.js.org/packages/ajv-errors.html
const addErrors = require("ajv-errors");
const uuid = require("uuid");

// Configure base Ajv
const ajv = new Ajv({
  strictSchema: false,
  useDefaults: true,
  allErrors: true,
  allowUnionTypes: true,
  coerceTypes: true,
});

// Enable `uuid` dynamic default
const def = require("ajv-keywords/dist/definitions/dynamicDefaults");
def.DEFAULTS.uuid = () => uuid.v4;

// Enhance Ajv
addFormats(ajv);
addKeywords(ajv);
addErrors(ajv);

// Exports
exports.validate = validate;
exports.transformToSchemaKey = transformToSchemaKey;

// Add all schemas from `schema` object.
for (const [key, value] of Object.entries(schemas)) {
  ajv.addSchema(value, key);
}

const compatibleSchemas = {
  config_v3: ["config_v2"],
  context_v3: ["context_v2"],
  openApi_v3: ["openApi_v2"],
  spec_v3: ["spec_v2"],
  step_v3: [
    "checkLink_v2",
    "find_v2",
    "goTo_v2",
    "httpRequest_v2",
    "runShell_v2",
    "runCode_v2",
    "saveScreenshot_v2",
    "setVariables_v2",
    "startRecording_v2",
    "stopRecording_v2",
    "typeKeys_v2",
    "wait_v2",
  ],
  test_v3: ["test_v2"],
};

/**
 * Escapes special characters in a string for safe use in a regular expression pattern.
 *
 * @param {string} string - The input string to escape.
 * @returns {string} The escaped string, safe for use in regular expressions.
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

/**
 * Validates an object against a specified JSON schema, supporting backward compatibility and automatic transformation from older schema versions if needed.
 *
 * If validation against the target schema fails and compatible older schemas are defined, attempts validation against each compatible schema. On a match, transforms the object to the target schema and revalidates. Returns the validation result, any errors, and the (possibly transformed) object.
 *
 * @param {Object} options
 * @param {string} options.schemaKey - The key identifying the target JSON schema.
 * @param {Object} options.object - The object to validate.
 * @param {boolean} [options.addDefaults=true] - Whether to include default values in the returned object.
 * @returns {{ valid: boolean, errors: string, object: Object }} Validation result, error messages, and the validated (and possibly transformed) object.
 *
 * @throws {Error} If {@link schemaKey} or {@link object} is missing.
 */
function validate({ schemaKey, object, addDefaults = true }) {
  if (!schemaKey) {
    throw new Error("Schema key is required.");
  }
  if (!object) {
    throw new Error("Object is required.");
  }
  const result = {};
  let validationObject;
  let check = ajv.getSchema(schemaKey);
  if (!check) {
    result.valid = false;
    result.errors = `Schema not found: ${schemaKey}`;
    result.object = object;
    return result;
  }

  // Clone the object to avoid modifying the original object
  validationObject = JSON.parse(JSON.stringify(object));

  // Check if the object is compatible with the schema
  result.valid = check(validationObject);
  result.errors = "";

  if (check.errors) {
    // Check if the object is compatible with another schema
    const compatibleSchemasList = compatibleSchemas[schemaKey];
    if (!compatibleSchemasList) {
      result.errors = check.errors
        .map(
          (error) =>
            `${error.instancePath} ${error.message} (${JSON.stringify(
              error.params
            )})`
        )
        .join(", ");
      result.object = object;
      result.valid = false;
      return result;
    }
    const matchedSchemaKey = compatibleSchemasList.find((key) => {
      validationObject = JSON.parse(JSON.stringify(object));
      const check = ajv.getSchema(key);
      if (check(validationObject)) return key;
    });
    if (!matchedSchemaKey) {
      result.errors = check.errors
        .map(
          (error) =>
            `${error.instancePath} ${error.message} (${JSON.stringify(
              error.params
            )})`
        )
        .join(", ");
      result.object = object;
      result.valid = false;
      return result;
    } else {
      const transformedObject = transformToSchemaKey({
        currentSchema: matchedSchemaKey,
        targetSchema: schemaKey,
        object: validationObject,
      });

      result.valid = check(transformedObject);
      if (result.valid) {
        validationObject = transformedObject;
        object = transformedObject;
      } else if (check.errors) {
        const errors = check.errors.map(
          (error) =>
            `${error.instancePath} ${error.message} (${JSON.stringify(
              error.params
            )})`
        );
        result.errors = errors.join(", ");
        return result;
      }
    }
  }
  if (addDefaults) {
    result.object = validationObject;
  } else {
    result.object = object;
  }

  return result;
}

/**
 * Transforms an object from one JSON schema version to another, supporting multiple schema types and nested conversions.
 *
 * @param {Object} params
 * @param {string} params.currentSchema - The schema key of the object's current version.
 * @param {string} params.targetSchema - The schema key to which the object should be transformed.
 * @param {Object} params.object - The object to transform.
 * @returns {Object} The transformed object, validated against the target schema.
 *
 * @throws {Error} If transformation between the specified schemas is not supported, or if the transformed object fails validation.
 *
 * @remark
 * Supports deep and recursive transformations for complex schema types, including steps, configs, contexts, OpenAPI integrations, specs, and tests. Throws if the schemas are incompatible or if the resulting object does not conform to the target schema.
 */
function transformToSchemaKey({
  currentSchema = "",
  targetSchema = "",
  object = {},
}) {
  // Check if the current schema is the same as the target schema
  if (currentSchema === targetSchema) {
    return object;
  }
  // Check if the current schema is compatible with the target schema
  if (!compatibleSchemas[targetSchema].includes(currentSchema)) {
    throw new Error(
      `Can't transform from ${currentSchema} to ${targetSchema}.`
    );
  }
  // Transform the object
  if (targetSchema === "step_v3") {
    const transformedObject = {
      stepId: object.id,
      description: object.description,
    };
    if (currentSchema === "goTo_v2") {
      transformedObject.goTo = {
        url: object.url,
        origin: object.origin,
      };
    } else if (currentSchema === "checkLink_v2") {
      transformedObject.checkLink = {
        url: object.url,
        origin: object.origin,
        statusCodes: object.statusCodes,
      };
    } else if (currentSchema === "find_v2") {
      transformedObject.find = {
        selector: object.selector,
        elementText: object.matchText,
        timeout: object.timeout,
        moveTo: object.moveTo,
        click: object.click,
        type: object.typeKeys,
      };
      // Handle typeKeys.delay key change
      if (typeof object.typeKeys === "object" && object.typeKeys.keys) {
        transformedObject.find.type.inputDelay = object.typeKeys.delay;
        delete transformedObject.find.type.delay;
      }
      transformedObject.variables = {};
      object.setVariables?.forEach((variable) => {
        transformedObject.variables[
          variable.name
        ] = `extract($$element.text, "${variable.regex}")`;
      });
    } else if (currentSchema === "httpRequest_v2") {
      transformedObject.httpRequest = {
        method: object.method,
        url: object.url,
        openApi: object.openApi,
        request: {
          body: object.requestData,
          headers: object.requestHeaders,
          parameters: object.requestParams,
        },
        response: {
          body: object.responseData,
          headers: object.responseHeaders,
        },
        statusCodes: object.statusCodes,
        allowAdditionalFields: object.allowAdditionalFields,
        timeout: object.timeout,
        path: object.savePath,
        directory: object.saveDirectory,
        maxVariation: object.maxVariation / 100,
        overwrite:
          object.overwrite === "byVariation"
            ? "aboveVariation"
            : object.overwrite,
      };
      // Handle openApi.requestHeaders key change
      if (object.openApi) {
        transformedObject.httpRequest.openApi = transformToSchemaKey({
          currentSchema: "openApi_v2",
          targetSchema: "openApi_v3",
          object: object.openApi,
        });
      }
      transformedObject.variables = {};
      object.envsFromResponseData?.forEach((variable) => {
        transformedObject.variables[
          variable.name
        ] = `jq($$response.body, "${variable.jqFilter}")`;
      });
    } else if (currentSchema === "runShell_v2") {
      transformedObject.runShell = {
        command: object.command,
        args: object.args,
        workingDirectory: object.workingDirectory,
        exitCodes: object.exitCodes,
        stdio: object.output,
        path: object.savePath,
        directory: object.saveDirectory,
        maxVariation: object.maxVariation / 100,
        overwrite:
          object.overwrite === "byVariation"
            ? "aboveVariation"
            : object.overwrite,
        timeout: object.timeout,
      };
      transformedObject.variables = {};
      object.setVariables?.forEach((variable) => {
        transformedObject.variables[
          variable.name
        ] = `extract($$stdio.stdout, "${variable.regex}")`;
      });
    } else if (currentSchema === "runCode_v2") {
      transformedObject.runCode = {
        language: object.language,
        code: object.code,
        args: object.args,
        workingDirectory: object.workingDirectory,
        exitCodes: object.exitCodes,
        stdio: object.output,
        path: object.savePath,
        directory: object.saveDirectory,
        maxVariation: object.maxVariation / 100,
        overwrite:
          object.overwrite === "byVariation"
            ? "aboveVariation"
            : object.overwrite,
        timeout: object.timeout,
      };
      transformedObject.variables = {};
      object?.setVariables?.forEach((variable) => {
        transformedObject.variables[
          variable.name
        ] = `extract($$stdio.stdout, "${variable.regex}")`;
      });
    } else if (currentSchema === "setVariables_v2") {
      transformedObject.loadVariables = object.path;
    } else if (currentSchema === "typeKeys_v2") {
      transformedObject.type = {
        keys: object.keys,
        inputDelay: object.delay,
      };
    } else if (currentSchema === "saveScreenshot_v2") {
      transformedObject.screenshot = {
        path: object.path,
        directory: object.directory,
        maxVariation: object.maxVariation / 100,
        overwrite:
          object.overwrite === "byVariation"
            ? "aboveVariation"
            : object.overwrite,
        crop: object.crop,
      };
    } else if (currentSchema === "startRecording_v2") {
      transformedObject.record = {
        path: object.path,
        directory: object.directory,
        overwrite: object.overwrite,
      };
    } else if (currentSchema === "stopRecording_v2") {
      transformedObject.stopRecord = true;
    } else if (currentSchema === "wait_v2") {
      transformedObject.wait = object;
    }
    const result = validate({
      schemaKey: "step_v3",
      object: transformedObject,
    });
    if (!result.valid) {
      throw new Error(`Invalid object: ${result.errors}`);
    }
    return result.object;
  } else if (targetSchema === "config_v3") {
    // Handle config_v2 to config_v3 transformation
    const transformedObject = {
      loadVariables: object.envVariables,
      input: object?.runTests?.input || object.input,
      output: object?.runTests?.output || object.output,
      recursive: object?.runTests?.recursive || object.recursive,
      relativePathBase: object.relativePathBase,
      detectSteps: object?.runTests?.detectSteps,
      beforeAny: object?.runTests?.setup,
      afterAll: object?.runTests?.cleanup,
      logLevel: object.logLevel,
      telemetry: object.telemetry,
    };
    // Handle context transformation
    if (object?.runTests?.contexts)
      transformedObject.runOn = object.runTests.contexts.map((context) =>
        transformToSchemaKey({
          currentSchema: "context_v2",
          targetSchema: "context_v3",
          object: context,
        })
      );
    // Handle openApi transformation
    if (object?.integrations?.openApi) {
      transformedObject.integrations = {};
      transformedObject.integrations.openApi = object.integrations.openApi.map(
        (description) =>
          transformToSchemaKey({
            currentSchema: "openApi_v2",
            targetSchema: "openApi_v3",
            object: description,
          })
      );
    }
    // Handle fileTypes transformation
    if (object?.fileTypes)
      transformedObject.fileTypes = object.fileTypes.map((fileType) => {
        const transformedFileType = {
          name: fileType.name,
          extensions: fileType.extensions.map((extension) =>
            // Trim leading `.` from extension
            extension.replace(/^\./, "")
          ),
          inlineStatements: {
            // Convert strings to regex, escaping special characters
            testStart: `${escapeRegExp(
              fileType.testStartStatementOpen
            )}(.*?)${escapeRegExp(fileType.testStartStatementClose)}`,
            testEnd: escapeRegExp(fileType.testEndStatement),
            ignoreStart: escapeRegExp(fileType.testIgnoreStatement),
            step: `${escapeRegExp(
              fileType.stepStatementOpen
            )}(.*?)${escapeRegExp(fileType.stepStatementClose)}`,
          },
        };
        if (fileType.markup)
          transformedFileType.markup = fileType.markup.map((markup) => {
            const transformedMarkup = {
              name: markup.name,
              regex: markup.regex,
            };
            if (markup.actions)
              transformedMarkup.actions = markup.actions.map((action) => {
                if (typeof action === "string") return action;
                if (typeof action === "object") {
                  if (action.params) {
                    action = {
                      action: action.name,
                      ...action.params,
                    };
                  }
                  const transformedAction = transformToSchemaKey({
                    currentSchema: `${action.action}_v2`,
                    targetSchema: "step_v3",
                    object: action,
                  });
                  return transformedAction;
                }
              });

            return transformedMarkup;
          });
        return transformedFileType;
      });
    const result = validate({
      schemaKey: "config_v3",
      object: transformedObject,
    });
    if (!result.valid) {
      throw new Error(`Invalid object: ${result.errors}`);
    }
    return result.object;
  } else if (targetSchema === "context_v3") {
    const transformedObject = {};
    // Handle context_v2 to context_v3 transformation
    transformedObject.platforms = object.platforms;
    if (object.app?.name) {
      const name = object.app.name === "edge" ? "chrome" : object.app?.name;
      transformedObject.browsers = [];
      transformedObject.browsers.push({
        name,
        headless: object.app?.options?.headless,
        window: {
          width: object.app?.options?.width,
          height: object.app?.options?.height,
        },
        viewport: {
          width: object.app?.options?.viewport_width,
          height: object.app?.options?.viewport_height,
        },
      });
    }
    const result = validate({
      schemaKey: "context_v3",
      object: transformedObject,
    });
    if (!result.valid) {
      throw new Error(`Invalid object: ${result.errors}`);
    }
    return result.object;
  } else if (targetSchema === "openApi_v3") {
    let transformedObject;
    // Handle openApi_v2 to openApi_v3 transformation
    const { name, requestHeaders, ...intermediaryObject } = object;
    intermediaryObject.name = object.name;
    intermediaryObject.headers = object.requestHeaders;
    transformedObject = { ...intermediaryObject };

    const result = validate({
      schemaKey: "openApi_v3",
      object: transformedObject,
    });
    if (!result.valid) {
      throw new Error(`Invalid object: ${result.errors}`);
    }
    return transformedObject;
  } else if (targetSchema === "spec_v3") {
    // Handle spec_v2 to spec_v3 transformation
    const transformedObject = {
      specId: object.id,
      description: object.description,
      contentPath: object.file,
    };
    if (object.contexts)
      transformedObject.runOn = object.contexts.map((context) =>
        transformToSchemaKey({
          currentSchema: "context_v2",
          targetSchema: "context_v3",
          object: context,
        })
      );
    if (object.openApi)
      transformedObject.openApi = object.openApi.map((description) =>
        transformToSchemaKey({
          currentSchema: "openApi_v2",
          targetSchema: "openApi_v3",
          object: description,
        })
      );
    transformedObject.tests = object.tests.map((test) =>
      transformToSchemaKey({
        currentSchema: "test_v2",
        targetSchema: "test_v3",
        object: test,
      })
    );

    const result = validate({
      schemaKey: "spec_v3",
      object: transformedObject,
    });
    if (!result.valid) {
      throw new Error(`Invalid object: ${result.errors}`);
    }
    return result.object;
  } else if (targetSchema === "test_v3") {
    // Handle test_v2 to test_v3 transformation
    const transformedObject = {
      testId: object.id,
      description: object.description,
      contentPath: object.file,
      detectSteps: object.detectSteps,
      before: object.setup,
      after: object.cleanup,
    };
    if (object.contexts)
      transformedObject.runOn = object.contexts.map((context) =>
        transformToSchemaKey({
          currentSchema: "context_v2",
          targetSchema: "context_v3",
          object: context,
        })
      );
    if (object.openApi)
      transformedObject.openApi = object.openApi.map((description) =>
        transformToSchemaKey({
          currentSchema: "openApi_v2",
          targetSchema: "openApi_v3",
          object: description,
        })
      );
    transformedObject.steps = object.steps.map((step) =>
      transformToSchemaKey({
        currentSchema: `${step.action}_v2`,
        targetSchema: "step_v3",
        object: step,
      })
    );

    const result = validate({
      schemaKey: "test_v3",
      object: transformedObject,
    });
    if (!result.valid) {
      throw new Error(`Invalid object: ${result.errors}`);
    }
    return result.object;
  }
  return null;
}

// If called directly, validate an example object
if (require.main === module) {
  const example =  {path: "/User/manny/projects/doc-detective/static/images/image.png"};

  const result = validate({ schemaKey: "screenshot_v3", object: example });
  console.log(JSON.stringify(result, null, 2));
}
