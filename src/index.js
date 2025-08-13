const { detectTests, detectAndResolveTests } = require("doc-detective-resolver");
const { log, cleanTemp } = require("./utils");
const { runSpecs } = require("./tests");
const { telemetryNotice, sendTelemetry } = require("./telem");

exports.runTests = runTests;

const supportMessage = `
##########################################################################
# Thanks for using Doc Detective! If this project was helpful to you,    #
# please consider starring the repo on GitHub or sponsoring the project: #
# - GitHub Sponsors: https://github.com/sponsors/doc-detective           #
# - Open Collective: https://opencollective.com/doc-detective            #
##########################################################################`;

// Run tests defined in specifications and documentation source files.
async function runTests(config) {
  // Telemetry notice
  telemetryNotice(config);

  const resolvedTests = await detectAndResolveTests({ config });
  if (!resolvedTests || resolvedTests.specs.length === 0) {
    log(config, "warn", "Couldn't resolve any tests.");
    return null;
  }

  // Run test specs
  const results = await runSpecs({ resolvedTests });
  log(config, "info", "RESULTS:");
  log(config, "info", results);
  log(config, "info", "Cleaning up and finishing post-processing.");

  // Clean up
  cleanTemp();

  // Send telemetry
  sendTelemetry(config, "runTests", results);
  log(config, "info", supportMessage);

  return results;
}
