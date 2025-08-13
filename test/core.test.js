const fs = require("fs");
const { runTests } = require("../src");
const { createServer } = require("./server");
const assert = require("assert").strict;
const path = require("path");
const artifactPath = path.resolve("./test/artifacts");
const config_base = require(`${artifactPath}/config.json`);
const inputPath = artifactPath;

// Create a server with custom options
const server = createServer({
  port: 8092,
  staticDir: "./test/server/public",
  modifyResponse: (req, body) => {
    // Optional modification of responses
    return { ...body, extraField: "added by server" };
  },
});

// Start the server before tests
before(async () => {
  try {
    await server.start();
  } catch (error) {
    console.error(`Failed to start test server: ${error.message}`);
    throw error;
  }
});

// Stop the server after tests
after(async () => {
  try {
    await server.stop();
  } catch (error) {
    console.error(`Failed to stop test server: ${error.message}`);
    // Don't rethrow here to avoid masking test failures
  }
});

describe("Run tests successfully", function () {
  // Set indefinite timeout
  this.timeout(0);
  it("All specs pass", async () => {
    const config_tests = JSON.parse(JSON.stringify(config_base));
    config_tests.runTests.input = inputPath;
    const result = await runTests(config_tests);
    assert.equal(result.summary.specs.fail, 0);
  });

  it("Tests skip steps after a failure", async () => {
    const failureTest = {
      tests: [
        {
          steps: [
            {
              runShell: "exit 1", // This step will fail
            },
            {
              runShell:
                "echo 'This step should be skipped if the previous fails'",
            },
          ],
        },
      ],
    };
    // Write the failure test to a temporary file
    const tempFilePath = path.resolve("./test/temp-failure-test.json");
    fs.writeFileSync(tempFilePath, JSON.stringify(failureTest, null, 2));
    const config = { input: tempFilePath, logLevel: "debug" };
    let result;
    try {
      result = await runTests(config);
      assert.equal(result.summary.steps.fail, 1);
      assert.equal(result.summary.steps.skipped, 1);
    } finally {
      // Ensure cleanup even on failure
      fs.unlinkSync(tempFilePath);
    }
  });

  it("Test skips when unsafe and unsafe is disallowed", async () => {
    const unsafeTest = {
      tests: [
        {
          steps: [
            {
              runShell: "echo 'This step is unsafe'",
              unsafe: true, // Marked as potentially unsafe
            },
          ],
        },
      ],
    };
    // Write the unsafe test to a temporary file
    const tempFilePath = path.resolve("./test/temp-unsafe-test.json");
    fs.writeFileSync(tempFilePath, JSON.stringify(unsafeTest, null, 2));
    const config = {
      input: tempFilePath,
      logLevel: "debug",
      allowUnsafeSteps: false,
    };
    let result;
    try {
      result = await runTests(config);
      assert.equal(result.summary.specs.fail, 0);
      assert.equal(result.summary.specs.skipped, 1);
    } finally {
      // Ensure cleanup even on failure
      fs.unlinkSync(tempFilePath);
    }
  });
});
