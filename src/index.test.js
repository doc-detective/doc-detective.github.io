const assert = require("assert");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const fs = require("fs");
const { detectTests, resolveTests, detectAndResolveTests } = require("./index");

before(async function () {
  const { expect } = await import("chai");
  global.expect = expect;
});

describe("detectTests", function () {
  let setConfigStub, qualifyFilesStub, parseTestsStub, logStub;
  let detectTests;
  let configInput, configResolved, files, specs;

  beforeEach(function () {
    configInput = { foo: "bar" };
    configResolved = { ...configInput, environment: "test" };
    files = ["file1.js", "file2.js"];
    specs = [{ name: "spec1" }, { name: "spec2" }];

    setConfigStub = sinon.stub().resolves(configResolved);
    qualifyFilesStub = sinon.stub().resolves(files);
    parseTestsStub = sinon.stub().resolves(specs);
    logStub = sinon.stub();

    detectTests = proxyquire("./index", {
      "./config": { setConfig: setConfigStub },
      "./utils": {
        qualifyFiles: qualifyFilesStub,
        parseTests: parseTestsStub,
        log: logStub,
      },
    }).detectTests;
  });

  afterEach(function () {
    sinon.restore();
  });

  it("should resolve config if environment is not set", async function () {
    await detectTests({ config: configInput });
    assert(setConfigStub.calledOnceWith({ config: configInput }));
    assert(qualifyFilesStub.calledOnceWith({ config: configResolved }));
    assert(parseTestsStub.calledOnceWith({ config: configResolved, files }));
    assert(logStub.calledWith(configResolved, "debug", "CONFIG:"));
    assert(logStub.calledWith(configResolved, "debug", configResolved));
  });

  it("should not resolve config if environment is set", async function () {
    const configWithEnv = { ...configInput, environment: "already" };
    await detectTests({ config: configWithEnv });
    assert(setConfigStub.notCalled);
    assert(qualifyFilesStub.calledOnceWith({ config: configWithEnv }));
    assert(parseTestsStub.calledOnceWith({ config: configWithEnv, files }));
  });

  it("should log files and specs", async function () {
    await detectTests({ config: configInput });
    assert(logStub.calledWith(configResolved, "debug", "FILES:"));
    assert(logStub.calledWith(configResolved, "debug", files));
    assert(logStub.calledWith(configResolved, "debug", "SPECS:"));
    assert(logStub.calledWith(configResolved, "info", specs));
  });

  it("should return the parsed specs", async function () {
    const result = await detectTests({ config: configInput });
    assert.strictEqual(result, specs);
  });

  it("should correctly parse a complicated input", async function () {
    // Simulate a config with complex structure and multiple files/specs
    const complicatedConfig = {
      foo: "bar",
      nested: { a: 1, b: [2, 3] },
      environment: undefined,
    };
    const complicatedResolved = {
      ...complicatedConfig,
      environment: "complicated",
    };
    const complicatedFiles = [
      "src/feature/alpha.js",
      "src/feature/beta.js",
      "src/feature/gamma.js",
    ];
    const complicatedSpecs = [
      { name: "alpha", steps: [1, 2, 3], meta: { tags: ["a", "b"] } },
      { name: "beta", steps: [4, 5], meta: { tags: ["b"] } },
      { name: "gamma", steps: [], meta: { tags: [] } },
    ];

    setConfigStub.resolves(complicatedResolved);
    qualifyFilesStub.resolves(complicatedFiles);
    parseTestsStub.resolves(complicatedSpecs);

    const result = await detectTests({ config: complicatedConfig });

    assert(setConfigStub.calledOnceWith({ config: complicatedConfig }));
    assert(qualifyFilesStub.calledOnceWith({ config: complicatedResolved }));
    assert(
      parseTestsStub.calledOnceWith({
        config: complicatedResolved,
        files: complicatedFiles,
      })
    );
    assert(logStub.calledWith(complicatedResolved, "debug", "FILES:"));
    assert(logStub.calledWith(complicatedResolved, "debug", complicatedFiles));
    assert(logStub.calledWith(complicatedResolved, "debug", "SPECS:"));
    assert(logStub.calledWith(complicatedResolved, "info", complicatedSpecs));
    assert.strictEqual(result, complicatedSpecs);
  });
});

// Input/output comparisons.
const yamlInput = `
tests:
- steps:
  - httpRequest:
      url: http://localhost:8080/api/users
      method: post
      request:
        body:
          name: John Doe
          job: Software Engineer
      response:
        body:
          name: John Doe
          job: Software Engineer
  - httpRequest:
      url: http://localhost:8080/api/users
      method: post
      request:
        body:
          data:
            - first_name: George
              last_name: Bluth
              id: 1
      response:
        body:
          data:
            - first_name: George
              last_name: Bluth
    variables:
      ID: $$response.body.data[0].id
  - httpRequest:
      url: http://localhost:8080/api/users/$ID
      method: get
      timeout: 1000
    savePath: response.json
    maxVariation: 0
    overwrite: aboveVariation
`;

const markdownInlineYaml = `
# Doc Detective documentation overview

<!-- test
testId: doc-detective-docs
detectSteps: false
-->

[Doc Detective documentation](http://doc-detective.com) is split into a few key sections:

<!-- step checkLink: "https://doc-detective.com" -->

- The landing page discusses what Doc Detective is, what it does, and who might find it useful.
- [Get started](https://doc-detective.com/docs/get-started/intro) covers how to quickly get up and running with Doc Detective.

  <!-- step checkLink: "https://doc-detective.com/docs/get-started/intro" -->

Some pages also have unique headings. If you open [type](https://doc-detective.com/docs/get-started/actions/type) it has **Special keys**.

<!-- step goTo: "https://doc-detective.com/docs/get-started/actions/type" -->
<!-- step find: Special keys -->

![Search results.](reference.png){ .screenshot }
<!-- step screenshot: reference.png -->
`;

const markdownInput = `
# Doc Detective documentation overview

[Doc Detective documentation](https://doc-detective.com) is split into a few key sections:

- The landing page discusses what Doc Detective is, what it does, and who might find it useful.
- [Get started](https://doc-detective.com/get-started.html) covers how to quickly get up and running with Doc Detective.
- The [references](https://doc-detective.com/reference/) detail the various JSON objects that Doc Detective expects for [configs](https://doc-detective.com/reference/schemas/config.html), [test specifications](https://doc-detective.com/reference/schemas/specification.html), [tests](https://doc-detective.com/reference/schemas/test), actions, and more. Open [typeKeys](https://doc-detective.com/reference/schemas/typeKeys.html)--or any other schema--and you'll find three sections: **Description**, **Fields**, and **Examples**.

![Search results.](reference.png)
`;

const codeInMarkdown = `
\`\`\`bash
# This is a bash code block
echo "Hello, World!"
\`\`\`

\`\`\`javascript
// This is a JavaScript code block
console.log("Hello, World!");
\`\`\`

\`\`\`python
# This is a Python code block
print("Hello, World!")
\`\`\`

\`\`\`bash testIgnore
# This is a bash code block that should be ignored
echo "This should not be detected as a test step"
\`\`\`
`;

describe("Input/output detect comparisons", async function () {
  it("should correctly parse YAML input", async function () {
    // Create temp yaml file
    const tempYamlFile = "temp.yaml";
    fs.writeFileSync(tempYamlFile, yamlInput.trim());
    const config = {
      input: tempYamlFile,
    };
    const results = await detectAndResolveTests({ config });
    fs.unlinkSync(tempYamlFile); // Clean up temp file
    expect(results).to.have.keys(["config", "specs"]);
    expect(results.specs).to.be.an("array").that.is.not.empty;
    expect(results.specs[0]).to.have.property("specId").that.is.a("string");
    expect(results.specs[0]).to.have.property("tests").that.is.an("array").that
      .is.not.empty;
    expect(results.specs[0].tests[0]).to.have.property("testId").that.is.a("string");
    expect(results.specs[0].tests[0])
      .to.have.property("contexts")
      .that.is.an("array").that.is.not.empty;
      const context = results.specs[0].tests[0].contexts[0];
    expect(context).to.have.property("contextId").that.is.a("string");
    expect(context).to.not.have.property("platform");
    expect(context).to.not.have.property("browser");
    expect(context)
      .to.have.property("steps")
      .that.is.an("array").that.is.not.empty;
    expect(context.steps).to.have.lengthOf(3);
  });

  it("should correctly parse markdown inline YAML input", async function () {
    // Create temp markdown file
    const tempMarkdownFile = "temp.md";
    fs.writeFileSync(tempMarkdownFile, markdownInlineYaml.trim());
    const config = {
      input: tempMarkdownFile,
    };
    const results = await detectAndResolveTests({ config });
    fs.unlinkSync(tempMarkdownFile); // Clean up temp file
    const steps = results.specs[0].tests[0].contexts[0].steps;
    expect(results.specs).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests[0].contexts).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests[0].contexts[0].steps).to.be.an("array").that.has.lengthOf(5);
  });

  it("should correctly parse markdown detected input", async function () {
    // Create temp markdown file
    const tempMarkdownFile = "temp_full.md";
    fs.writeFileSync(tempMarkdownFile, markdownInput.trim());
    const config = {
      input: tempMarkdownFile,
    };
    const results = await detectAndResolveTests({ config });
    fs.unlinkSync(tempMarkdownFile); // Clean up temp file
    expect(results.specs).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests[0].contexts).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests[0].contexts[0].steps).to.be.an("array").that.has.lengthOf(11);
  });

  it("should correctly parse code in markdown input", async function () {
    // Create temp markdown file
    const tempMarkdownFile = "temp_code.md";
    fs.writeFileSync(tempMarkdownFile, codeInMarkdown.trim());
    const config = {
      input: tempMarkdownFile,
    };
    const results = await detectAndResolveTests({ config });
    fs.unlinkSync(tempMarkdownFile); // Clean up temp file
    expect(results.specs).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests[0].contexts).to.be.an("array").that.has.lengthOf(1);
    expect(results.specs[0].tests[0].contexts[0].steps).to.be.an("array").that.has.lengthOf(3);
  });
});
