const kill = require("tree-kill");
const wdio = require("webdriverio");
const os = require("os");
const { log, replaceEnvs } = require("./utils");
const axios = require("axios");
const { instantiateCursor } = require("./tests/moveTo");
const { goTo } = require("./tests/goTo");
const { findElement } = require("./tests/findElement");
const { runShell } = require("./tests/runShell");
const { checkLink } = require("./tests/checkLink");
const { typeKeys } = require("./tests/typeKeys");
const { wait } = require("./tests/wait");
const { saveScreenshot } = require("./tests/saveScreenshot");
const { startRecording } = require("./tests/startRecording");
const { stopRecording } = require("./tests/stopRecording");
const { loadVariables } = require("./tests/loadVariables");
const { httpRequest } = require("./tests/httpRequest");
const { clickElement } = require("./tests/click");
const { runCode } = require("./tests/runCode");
const path = require("path");
const { spawn } = require("child_process");
const uuid = require("uuid");
const { setAppiumHome } = require("./appium");
const { resolveExpression } = require("./expressions");
const { getEnvironment, getAvailableApps } = require("./config");

exports.runSpecs = runSpecs;
// exports.appiumStart = appiumStart;
// exports.appiumIsReady = appiumIsReady;
// exports.driverStart = driverStart;

// Doc Detective actions that require a driver.
const driverActions = [
  "click",
  "stopRecord",
  "find",
  "goTo",
  "record",
  "screenshot",
  "type",
];

// Get Appium driver capabilities and apply options.
function getDriverCapabilities({ runnerDetails, name, options }) {
  let capabilities = {};
  let args = [];

  // Set Firefox capabilities
  switch (name) {
    case "firefox":
      firefox = runnerDetails.availableApps.find((app) => app.name === "firefox");
      if (!firefox) break;
      // Set args
      // Reference: https://wiki.mozilla.org/Firefox/CommandLineOptions
      if (options.headless) args.push("--headless");
      // Set capabilities
      capabilities = {
        platformName: runnerDetails.environment.platform,
        "appium:automationName": "Gecko",
        "appium:newCommandTimeout": 600, // 10 minutes
        "wdio:enforceWebDriverClassic": true,
        browserName: "MozillaFirefox",
        "moz:firefoxOptions": {
          // Reference: https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities/firefoxOptions
          args,
          // If recording, make bottom corners pointed
          profile:
            "UEsDBBQAAAAIAKm6lldWzDiRbgAAAKUAAAAlAAAAZmlyZWZveF9wcm9maWxlL2Nocm9tZS91c2VyQ2hyb21lLmNzc3XMQQrCMBBG4X1O8Yu7QqhrPYOHiGbaDpqZMBmJIN7dgu6K28fHC+OAc7oRLuquBVc1IWvQCb6s1bQ3MnSWrB1VWZwyhjHsS2KJv/4KWAeWyeL3E+80ebSU+dGOONQndlyqmifx0wYbz8t//Q4fUEsBAhQDFAAAAAgAqbqWV1bMOJFuAAAApQAAACUAAAAAAAAAAAAAAKSBAAAAAGZpcmVmb3hfcHJvZmlsZS9jaHJvbWUvdXNlckNocm9tZS5jc3NQSwUGAAAAAAEAAQBTAAAAsQAAAAAA",
          prefs: {
            "toolkit.legacyUserProfileCustomizations.stylesheets": true, // Enable userChrome.css and userContent.css
          },
          binary: firefox.path,
        },
      };
      break;
    case "safari":
      // Set Safari capabilities
      if (runnerDetails.availableApps.find((app) => app.name === "safari")) {
        safari = runnerDetails.availableApps.find((app) => app.name === "safari");
        if (!safari) break;
        // Set capabilities
        capabilities = {
          platformName: "Mac",
          "appium:automationName": "Safari",
          "appium:newCommandTimeout": 600, // 10 minutes
          "wdio:enforceWebDriverClassic": true,
          browserName: "Safari",
        };
      }
      break;
    case "chrome":
      // Set Chrome(ium) capabilities
      if (runnerDetails.availableApps.find((app) => app.name === name)) {
        const chromium = runnerDetails.availableApps.find(
          (app) => app.name === name
        );
        if (!chromium) break;
        // Set args
        args.push(`--enable-chrome-browser-cloud-management`);
        args.push(`--auto-select-desktop-capture-source=RECORD_ME`);
        if (options.headless) args.push("--headless", "--disable-gpu");
        if (process.platform === "linux") args.push("--no-sandbox");
        // Set capabilities
        capabilities = {
          platformName: runnerDetails.environment.platform,
          "appium:automationName": "Chromium",
          "appium:newCommandTimeout": 600, // 10 minutes
          "appium:executable": chromium.driver,
          browserName: "chrome",
          "wdio:enforceWebDriverClassic": true,
          "goog:chromeOptions": {
            // Reference: https://chromedriver.chromium.org/capabilities#h.p_ID_102
            args,
            prefs: {
              "download.default_directory": os.tmpdir(),
              "download.prompt_for_download": false,
              "download.directory_upgrade": true,
            },
            binary: chromium.path,
          },
        };
      }
      break;
    default:
      break;
  }

  return capabilities;
}

// Check if any steps require an Appium driver.
function isAppiumRequired(specs) {
  let appiumRequired = false;
  specs.forEach((spec) => {
    spec.tests.forEach((test) => {
      test.contexts.forEach((context) => {
        // Check if test includes actions that require a driver.
        if (isDriverRequired({ test: context })) {
          appiumRequired = true;
        }
      });
    });
  });
  return appiumRequired;
}

function isDriverRequired({ test }) {
  let driverRequired = false;
  test.steps.forEach((step) => {
    // Check if test includes actions that require a driver.
    driverActions.forEach((action) => {
      if (typeof step[action] !== "undefined") driverRequired = true;
    });
  });
  return driverRequired;
}

// Check if context is supported by current platform and available apps
function isSupportedContext({ context, apps, platform }) {
  // Check browsers
  let isSupportedApp = true;
  // Check platform
  const isSupportedPlatform = context.platform === platform;
  if (context?.browser?.name)
    isSupportedApp = apps.find((app) => app.name === context.browser.name);
  // Return boolean
  if (isSupportedApp && isSupportedPlatform) {
    return true;
  } else {
    return false;
  }
}

function getDefaultBrowser({ runnerDetails }) {
  let browser = {};
  const browserNames = ["firefox", "chrome", "safari"];
  for (const name of browserNames) {
    if (runnerDetails.availableApps.find(app => app.name === name)) {
      browser = { name };
      break;
    }
  }
  return browser;
}

// Set window size to match target viewport size
async function setViewportSize(context, driver) {
  if (context.browser?.viewport?.width || context.browser?.viewport?.height) {
    // Get viewport size, not window size
    const viewportSize = await driver.executeScript(
      "return { width: window.innerWidth, height: window.innerHeight }",
      []
    );
    // Get window size
    const windowSize = await driver.getWindowSize();
    // Get viewport size delta
    const deltaWidth =
      (context.browser?.viewport?.width || viewportSize.width) -
      viewportSize.width;
    const deltaHeight =
      (context.browser?.viewport?.height || viewportSize.height) -
      viewportSize.height;
    // Resize window if necessary
    await driver.setWindowSize(
      windowSize.width + deltaWidth,
      windowSize.height + deltaHeight
    );
    // Confirm viewport size
    const finalViewportSize = await driver.executeScript(
      "return { width: window.innerWidth, height: window.innerHeight }",
      []
    );
  }
}

async function allowUnsafeSteps({ config }) {
  // If allowUnsafeSteps is set to true, return true
  if (config.allowUnsafeSteps === true) return true;
  // If allowUnsafeSteps is set to false, return false
  else if (config.allowUnsafeSteps === false) return false;
  // if DOC_DETECTIVE.container is set to true, return true
  else if (process.env.DOC_DETECTIVE && JSON.parse(process.env.DOC_DETECTIVE).container) return true;
  // If allowUnsafeSteps is not set, return false by default
  else return false;
}

// Iterate through and execute test specifications and contained tests.
async function runSpecs({ resolvedTests }) {
  const config = resolvedTests.config;
  const specs = resolvedTests.specs;

  // Get runner details
  const runnerDetails = {
    environment: getEnvironment(),
    availableApps: await getAvailableApps({ config }),
    allowUnsafeSteps: await allowUnsafeSteps({ config }),
  };

  // Set initial shorthand values
  const platform = runnerDetails.environment.platform;
  const availableApps = runnerDetails.availableApps;
  const metaValues = { specs: {} };
  let appium;
  const report = {
    summary: {
      specs: {
        pass: 0,
        fail: 0,
        warning: 0,
        skipped: 0,
      },
      tests: {
        pass: 0,
        fail: 0,
        warning: 0,
        skipped: 0,
      },
      contexts: {
        pass: 0,
        fail: 0,
        warning: 0,
        skipped: 0,
      },
      steps: {
        pass: 0,
        fail: 0,
        warning: 0,
        skipped: 0,
      },
    },
    specs: [],
  };

  // Determine which apps are required
  const appiumRequired = isAppiumRequired(specs);

  // Warm up Appium
  if (appiumRequired) {
    // Set Appium home directory
    setAppiumHome();
    // Start Appium server
    appium = spawn("npx", ["appium"], {
      shell: true,
      windowsHide: true,
      cwd: path.join(__dirname, ".."),
    });
    appium.stdout.on("data", (data) => {
      //   console.log(`stdout: ${data}`);
    });
    appium.stderr.on("data", (data) => {
      //   console.error(`stderr: ${data}`);
    });
    await appiumIsReady();
    log(config, "debug", "Appium is ready.");
  }

  // Iterate specs
  log(config, "info", "Running test specs.");
  for (const spec of specs) {
    log(config, "debug", `SPEC: ${spec.specId}`);

    // Set spec report
    let specReport = {
      specId: spec.specId,
      description: spec.description,
      contentPath: spec.contentPath,
      tests: [],
    };
    // Set meta values
    metaValues.specs[spec.specId] = { tests: {} };

    // Iterates tests
    for (const test of spec.tests) {
      log(config, "debug", `TEST: ${test.testId}`);

      // Set test report
      let testReport = {
        testId: test.testId,
        description: test.description,
        contentPath: test.contentPath,
        detectSteps: test.detectSteps,
        contexts: [],
      };
      // Set meta values
      metaValues.specs[spec.specId].tests[test.testId] = { contexts: [] };

      // Iterate contexts
      // TODO: Support both serial and parallel execution
      for (const context of test.contexts) {
        // If "platform" is not defined, set it to the current platform
        if (!context.platform)
          context.platform = runnerDetails.environment.platform;

        // If "browser" isn't defined but is required by the test, set it to the first available browser in the sequence of Firefox, Chrome, Safari
        if (!context.browser && isDriverRequired({ test: context })) {
          context.browser = getDefaultBrowser({ runnerDetails });
        }

        log(config, "debug", `CONTEXT:\n${JSON.stringify(context, null, 2)}`);

        // Set context report
        let contextReport = {
          platform: context.platform,
          browser: context.browser,
          steps: [],
        };
        // Set meta values
        metaValues.specs[spec.specId].tests[test.testId].contexts[
          context.contextId
        ] = { steps: {} };

        // Check if current environment supports given contexts
        const supportedContext = isSupportedContext({
          context: context,
          apps: availableApps,
          platform: platform,
        });

        // If context isn't supported, skip it
        if (!supportedContext) {
          log(
            config,
            "warning",
            `Skipping context. The current system doesn't support this context (${JSON.stringify(
              context
            )}).`
          );
          contextReport = { result: { status: "SKIPPED" }, ...contextReport };
          report.summary.contexts.skipped++;
          testReport.contexts.push(contextReport);
          continue;
        }

        let driver;
        // Ensure context contains a 'steps' property
        if (!context.steps) {
          context.steps = [];
        }
        const driverRequired = isDriverRequired({ test: context });
        if (driverRequired) {
          // Define driver capabilities
          // TODO: Support custom apps
          let caps = getDriverCapabilities({
            runnerDetails: runnerDetails,
            name: context.browser.name,
            options: {
              width: context.browser?.window?.width || 1200,
              height: context.browser?.window?.height || 800,
              headless: context.browser?.headless !== false,
            },
          });
          log(config, "debug", "CAPABILITIES:");
          log(config, "debug", caps);

          // Instantiate driver
          try {
            driver = await driverStart(caps);
          } catch (error) {
            try {
              // If driver fails to start, try again as headless
              log(
                config,
                "warning",
                `Failed to start context '${context.browser?.name}' on '${platform}'. Retrying as headless.`
              );
              context.browser.headless = true;
              caps = getDriverCapabilities({
                config: config,
                name: context.browser.name,
                options: {
                  width: context.browser?.window?.width || 1200,
                  height: context.browser?.window?.height || 800,
                  headless: context.browser?.headless !== false,
                },
              });
              driver = await driverStart(caps);
            } catch (error) {
              let errorMessage = `Failed to start context '${context.browser?.name}' on '${platform}'.`;
              if (context.browser?.name === "safari")
                errorMessage =
                  errorMessage +
                  " Make sure you've run `safaridriver --enable` in a terminal and enabled 'Allow Remote Automation' in Safari's Develop menu.";
              log(config, "error", errorMessage);
              contextReport = {
                result: { status: "SKIPPED", description: errorMessage },
                ...contextReport,
              };
              report.summary.contexts.skipped++;
              testReport.contexts.push(contextReport);
              continue;
            }
          }

          if (
            context.browser?.viewport?.width ||
            context.browser?.viewport?.height
          ) {
            // Set driver viewport size
            await setViewportSize(context, driver);
          } else if (
            context.browser?.window?.width ||
            context.browser?.window?.height
          ) {
            // Get driver window size
            const windowSize = await driver.getWindowSize();
            // Resize window if necessary
            await driver.setWindowSize(
              context.browser?.window?.width || windowSize.width,
              context.browser?.window?.height || windowSize.height
            );
          }
        }

        // Iterates steps
        let stepExecutionFailed = false;
        for (let step of context.steps) {
          // Set step id if not defined
          if (!step.stepId) step.stepId = `${uuid.v4()}`;
          log(config, "debug", `STEP:\n${JSON.stringify(step, null, 2)}`);


          if (step.unsafe && runnerDetails.allowUnsafeSteps === false) {
            log(
              config,
              "warning",
              `Skipping unsafe step: ${step.description} in test ${test.testId} context ${context.contextId}`
            );
            // Mark as skipped
            const stepReport = {
              ...step,
              result: "SKIPPED",
              resultDescription: "Skipped because unsafe steps aren't allowed."
            };
            contextReport.steps.push(stepReport);
            report.summary.steps.skipped++;
            continue;
          }

          if (stepExecutionFailed) {
            // Mark as skipped
            const stepReport = {
              ...step,
              result: "SKIPPED",
              resultDescription: "Skipped due to previous failure in context."
            };
            contextReport.steps.push(stepReport);
            report.summary.steps.skipped++;
            continue;
          }

          // Set meta values
          metaValues.specs[spec.specId].tests[test.testId].contexts[
            context.contextId
          ].steps[step.stepId] = {};

          // Run step
          const stepResult = await runStep({
            config: config,
            context: context,
            step: step,
            driver: driver,
            metaValues: metaValues,
            options: {
              openApiDefinitions: context.openApi || [],
            },
          });
          log(
            config,
            "debug",
            `RESULT: ${stepResult.status}, ${stepResult.description}`
          );

          stepResult.result = stepResult.status;
          stepResult.resultDescription = stepResult.description;
          delete stepResult.status;
          delete stepResult.description;

          // Add step result to report
          const stepReport = {
            ...stepResult,
            ...step,
          };
          contextReport.steps.push(stepReport);
          report.summary.steps[stepReport.result.toLowerCase()]++;

          // If this step failed, set flag to skip remaining steps
          if (stepReport.result === "FAIL") {
            stepExecutionFailed = true;
          }
        }

        // If recording, stop recording
        if (config.recording) {
          const stopRecordStep = {
            stopRecord: true,
            description: "Stopping recording",
            stepId: `${uuid.v4()}`,
          };
          const stepResult = await runStep({
            config: config,
            context: context,
            step: stopRecordStep,
            driver: driver,
            options: {
              openApiDefinitions,
            },
          });
          stepResult.result = stepResult.status;
          stepResult.resultDescription = stepResult.description;
          delete stepResult.status;
          delete stepResult.description;

          // Add step result to report
          const stepReport = {
            ...stepResult,
            ...step,
          };
          contextReport.steps.push(stepReport);
          report.summary.steps[stepReport.result.toLowerCase()]++;
        }

        // Parse step results to calc context result

        // If any step fails, context fails
        if (contextReport.steps.find((step) => step.result === "FAIL"))
          contextResult = "FAIL";
        // If any step warns, context warns
        else if (contextReport.steps.find((step) => step.result === "WARNING"))
          contextResult = "WARNING";
        // If all steps skipped, context skipped
        else if (
          contextReport.steps.length ===
          contextReport.steps.filter((step) => step.result === "SKIPPED").length
        )
          contextResult = "SKIPPED";
        // If all steps pass, context passes
        else contextResult = "PASS";

        contextReport = { result: contextResult, ...contextReport };
        testReport.contexts.push(contextReport);
        report.summary.contexts[contextResult.toLowerCase()]++;

        if (driverRequired) {
          // Close driver
          try {
            await driver.deleteSession();
          } catch (error) {
            log(
              config,
              "error",
              `Failed to delete driver session: ${error.message}`
            );
          }
        }
      }

      // Parse context results to calc test result

      // If any context fails, test fails
      if (testReport.contexts.find((context) => context.result === "FAIL"))
        testResult = "FAIL";
      // If any context warns, test warns
      else if (
        testReport.contexts.find((context) => context.result === "WARNING")
      )
        testResult = "WARNING";
      // If all contexts skipped, test skipped
      else if (
        testReport.contexts.length ===
        testReport.contexts.filter((context) => context.result === "SKIPPED")
          .length
      )
        testResult = "SKIPPED";
      // If all contexts pass, test passes
      else testResult = "PASS";

      testReport = { result: testResult, ...testReport };
      specReport.tests.push(testReport);
      report.summary.tests[testResult.toLowerCase()]++;
    }

    // Parse test results to calc spec result

    // If any context fails, test fails
    if (specReport.tests.find((test) => test.result === "FAIL"))
      specResult = "FAIL";
    // If any test warns, spec warns
    else if (specReport.tests.find((test) => test.result === "WARNING"))
      specResult = "WARNING";
    // If all tests skipped, spec skipped
    else if (
      specReport.tests.length ===
      specReport.tests.filter((test) => test.result === "SKIPPED").length
    )
      specResult = "SKIPPED";
    // If all contexts pass, test passes
    else specResult = "PASS";

    specReport = { result: specResult, ...specReport };
    report.specs.push(specReport);
    report.summary.specs[specResult.toLowerCase()]++;
  }

  // Close appium server
  if (appium) {
    log(config, "debug", "Closing Appium server");
    kill(appium.pid);
  }

  return report;
}

// Run a specific step
async function runStep({
  config,
  context,
  step,
  driver,
  metaValues,
  options = {},
}) {
  let actionResult;
  // Load values from environment variables
  step = replaceEnvs(step);
  if (typeof step.click !== "undefined") {
    actionResult = await clickElement({
      config: config,
      step: step,
      driver: driver,
    });
  } else if (typeof step.checkLink !== "undefined") {
    actionResult = await checkLink({ config: config, step: step });
  } else if (typeof step.find !== "undefined") {
    actionResult = await findElement({ config: config, step: step, driver });
  } else if (typeof step.stopRecord !== "undefined") {
    actionResult = await stopRecording({ config: config, step: step, driver });
  } else if (typeof step.goTo !== "undefined") {
    actionResult = await goTo({ config: config, step: step, driver: driver });
  } else if (typeof step.loadVariables !== "undefined") {
    actionResult = await loadVariables({ step: step });
  } else if (typeof step.httpRequest !== "undefined") {
    actionResult = await httpRequest({
      config: config,
      step: step,
      openApiDefinitions: options?.openApiDefinitions,
    });
  } else if (typeof step.record !== "undefined") {
    actionResult = await startRecording({
      config: config,
      context: context,
      step: step,
      driver: driver,
    });
    config.recording = actionResult.recording;
  } else if (typeof step.runCode !== "undefined") {
    actionResult = await runCode({ config: config, step: step });
  } else if (typeof step.runShell !== "undefined") {
    actionResult = await runShell({ config: config, step: step });
  } else if (typeof step.screenshot !== "undefined") {
    actionResult = await saveScreenshot({
      config: config,
      step: step,
      driver: driver,
    });
  } else if (typeof step.type !== "undefined") {
    actionResult = await typeKeys({
      config: config,
      step: step,
      driver: driver,
    });
  } else if (typeof step.wait !== "undefined") {
    actionResult = await wait({ step: step });
  } else {
    actionResult = {
      status: "FAIL",
      description: `Unknown step action: ${JSON.stringify(step)}`,
    };
  }
  // If recording, wait until browser is loaded, then instantiate cursor
  if (config.recording) {
    const currentUrl = await driver.getUrl();
    if (currentUrl !== driver.state.url) {
      driver.state.url = currentUrl;
      await instantiateCursor(driver);
    }
  }
  // Clean up actionResult outputs
  if (actionResult?.outputs?.rawElement) {
    delete actionResult.outputs.rawElement;
  }

  // If variables are defined, resolve and set them
  if (step.variables) {
    await Promise.all(
      Object.keys(step.variables).map(async (key) => {
        const expression = step.variables[key];
        const value = await resolveExpression({
          expression: expression,
          context: { ...metaValues, ...actionResult.outputs },
        });
        process.env[key] = value;
      })
    );
  }
  return actionResult;
}

// Delay execution until Appium server is available.
async function appiumIsReady() {
  let isReady = false;
  while (!isReady) {
    // Retry delay
    // TODO: Add configurable retry delay
    // TODO: Add configurable timeout duration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      let resp = await axios.get("http://0.0.0.0:4723/sessions");
      if (resp.status === 200) isReady = true;
    } catch {}
  }
  return isReady;
}

// Start the Appium driver specified in `capabilities`.
async function driverStart(capabilities) {
  const driver = await wdio.remote({
    protocol: "http",
    hostname: "0.0.0.0",
    port: 4723,
    path: "/",
    capabilities,
    connectionRetryTimeout: 600000, // 10 minutes
    waitforTimeout: 600000, // 10 minutes
  });
  driver.state = { url: "", x: null, y: null };
  return driver;
}
