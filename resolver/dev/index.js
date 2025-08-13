const { detectTests, resolveTests, detectAndResolveTests } = require("../src");
const { validate, schemas } = require("doc-detective-common");
const { execCommand, spawnCommand } = require("../src/utils");
const path = require("path");

main();

/**
 * Detects and resolves test cases in a specified markdown file using configured patterns and actions, then outputs the results to a JSON file.
 *
 * The function analyzes the input markdown file for test-related statements and code blocks according to the provided configuration, processes detected tests, and writes the structured results to "output.json" in the current directory.
 */
async function main() {
  const json = {
    input: "./dev/cleanup.spec.json",
    logLevel: "debug",
  };
  result = await detectTests({ config: json });
  console.log(JSON.stringify(result, null, 2));
  // Output the result to a file
  const outputPath = path.join(__dirname, "output.json");
  const fs = require("fs");
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`Output written to ${outputPath}`);
}
