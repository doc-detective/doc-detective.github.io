const { runTests } = require("../src");
const assert = require("assert").strict;
const path = require("path");
const artifactPath = path.resolve("./test/artifacts");
const config = require(`${artifactPath}/config.json`);

describe("Run tests sucessfully", function() {
  // Set indefinite timeout
  this.timeout(0);
  it("All specs pass", async () => {
    const inputPath = artifactPath;
    config.runTests.input = inputPath;
    const result = await runTests(config);
    assert.equal(result.summary.specs.pass, 2);
  });
});
