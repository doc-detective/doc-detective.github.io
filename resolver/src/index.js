const { setConfig } = require("./config");
const { qualifyFiles, parseTests, log } = require("./utils");
const { resolveDetectedTests } = require("./resolve");
// const { telemetryNotice, sendTelemetry } = require("./telem");

exports.detectTests = detectTests;
exports.resolveTests = resolveTests;
exports.detectAndResolveTests = detectAndResolveTests;

// const supportMessage = `
// ##########################################################################
// # Thanks for using Doc Detective! If this project was helpful to you,    #
// # please consider starring the repo on GitHub or sponsoring the project: #
// # - GitHub Sponsors: https://github.com/sponsors/doc-detective           #
// # - Open Collective: https://opencollective.com/doc-detective            #
// ##########################################################################`;

/**
 * Detects and resolves tests based on the provided configuration.
 *
 * This function performs the following steps:
 * 1. Sets and validates the configuration
 * 2. Detects tests according to the configuration
 * 3. Resolves the detected tests
 *
 * @async
 * @param {Object} options - The options object
 * @param {Object} options.config - The configuration object for test detection and resolution
 * @returns {Promise<Object>} A promise that resolves to an object of resolved tests
 */
async function detectAndResolveTests({ config }) {
  // Set config
  config = await setConfig({ config });
  // Detect tests
  const detectedTests = await detectTests({ config });
  if (!detectedTests || detectedTests.length === 0) {
    log(config, "warn", "No tests detected.");
    return null;
  }
  // Resolve tests
  const resolvedTests = await resolveTests({ config, detectedTests });
  return resolvedTests;
}

/**
 * Resolves test configurations by first ensuring the environment is set in the config,
 * then processing the detected tests to resolve them according to the configuration.
 *
 * @async
 * @param {Object} params - The parameters object.
 * @param {Object} params.config - The configuration object, which may need to be resolved if environment isn't set.
 * @param {Object} params.detectedTests - The tests that have been detected and need to be resolved.
 * @returns {Promise<Object>} A promise that resolves to an object of resolved test configurations.
 */
async function resolveTests({ config, detectedTests }) {
  if (!config.environment) {
    // If environment isn't set, config hasn't been resolved
    config = await setConfig({ config });
    log(config, "debug", `CONFIG:`);
    log(config, "debug", config);
  }
  // Resolve detected tests
  const resolvedTests = await resolveDetectedTests({ config, detectedTests });
  return resolvedTests;
}

/**
 * Detects and processes test specifications based on provided configuration.
 *
 * This function performs the following steps:
 * 1. Resolves configuration if not already done
 * 2. Qualifies files based on configuration
 * 3. Parses test specifications from the qualified files
 *
 * @async
 * @param {Object} options - The options object
 * @param {Object} options.config - Configuration object, may be unresolved
 * @returns {Promise<Array>} - Promise resolving to an array of test specifications
 */
async function detectTests({ config }) {
  if (!config.environment) {
    // If environment isn't set, config hasn't been resolved
    config = await setConfig({ config });
    log(config, "debug", `CONFIG:`);
    log(config, "debug", config);
  }
  // // Telemetry notice
  // telemetryNotice(config);

  // Set files
  const files = await qualifyFiles({ config });
  log(config, "debug", `FILES:`);
  log(config, "debug", files);

  // Set test specs
  const specs = await parseTests({ config, files });
  log(config, "debug", `SPECS:`);
  log(config, "info", specs);

  // Run test specs
  // const results = await runSpecs(config, specs);
  // log(config, "info", "RESULTS:");
  // log(config, "info", results);
  // log(config, "info", "Cleaning up and finishing post-processing.");

  // Send telemetry
  // sendTelemetry(config, "detect", results);
  // log(config, "info", supportMessage);

  return specs;
}
