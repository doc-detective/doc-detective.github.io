const os = require("os");
const { validate } = require("doc-detective-common");
const { log, spawnCommand, loadEnvs, replaceEnvs } = require("./utils");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const browsers = require("@puppeteer/browsers");
const { setAppiumHome } = require("./appium");
const { loadDescription } = require("./openapi");

exports.setConfig = setConfig;
exports.getAvailableApps = getAvailableApps;
exports.getEnvironment = getEnvironment;

// Map of Node-detected platforms to common-term equivalents
const platformMap = {
  darwin: "mac",
  linux: "linux",
  win32: "windows",
};

// List of default apps to check for
// Note: Edge/Microsoft Edge is not supported and detection is intentionally excluded
const defaultAppIDs = {
  chromium: {
    linux: "chromium-browser",
    mac: "org.chromium.Chromium",
    windows: "chromium",
  },
  firefox: {
    linux: "firefox",
    mac: "org.mozilla.firefox",
    windows: "firefox",
  },
  chrome: {
    linux: "google-chrome",
    mac: "org.google.Chrome",
    windows: "chrome",
  },
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
      // {
      //   name: "runBash",
      //   regex: ["```(?:bash)\\b\\s*\\n(?<code>.*?)(?=\\n```)"],
      //   batchMatches: true,
      //   actions: [
      //     {
      //       runCode: {
      //         language: "bash",
      //         code: "$1",
      //       },
      //     },
      //   ],
      // },
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

  // Validate inbound `config`.
  const validityCheck = validate({ schemaKey: "config_v3", object: config });
  if (!validityCheck.valid) {
    // TODO: Improve error message reporting.
    log(
      config,
      "error",
      `Invalid config object: ${validityCheck.errors}. Exiting.`
    );
    process.exit(1);
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
    process.exit(1);
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
        if (typeof markup.regex === "string") markup.regex = [markup.regex];
        return markup;
      });
    }

    return fileType;
  });

  // Detect current environment.
  config.environment = getEnvironment();
  config.environment.apps = await getAvailableApps(config);
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
  return environment;
}

// Detect available apps.
async function getAvailableApps({ config }) {
  setAppiumHome();
  cwd = process.cwd();
  process.chdir(path.join(__dirname, ".."));
  const apps = [];

  const installedBrowsers = await browsers.getInstalledBrowsers({
    cacheDir: path.resolve("browser-snapshots"),
  });
  const installedAppiumDrivers = await spawnCommand("npx appium driver list");

  // Note: Edge/Microsoft Edge detection is intentionally excluded
  // Only Chrome, Firefox, and Safari are supported browsers

  // Detect Chrome
  const chrome = installedBrowsers.find(
    (browser) => browser.browser === "chrome"
  );
  const chromeVersion = chrome.buildId;
  const chromedriver = installedBrowsers.find(
    (browser) => browser.browser === "chromedriver"
  );
  const appiumChromium = installedAppiumDrivers.stderr.match(
    /\n.*chromium.*installed \(npm\).*\n/
  );

  if (chrome && chromedriver && appiumChromium) {
    apps.push({
      name: "chrome",
      version: chromeVersion,
      path: chrome.executablePath,
      driver: chromedriver.executablePath,
    });
  }

  // Detect Firefox
  const firefox = installedBrowsers.find(
    (browser) => browser.browser === "firefox"
  );
  const appiumFirefox = installedAppiumDrivers.stderr.match(
    /\n.*gecko.*installed \(npm\).*\n/
  );

  if (firefox && appiumFirefox) {
    apps.push({
      name: "firefox",
      version: firefox.buildId,
      path: firefox.executablePath,
    });
  }

  // Detect Safari
  if (config.environment.platform === "mac") {
    const safariVersion = await spawnCommand(
      "defaults read /Applications/Safari.app/Contents/Info.plist CFBundleShortVersionString"
    );
    const appiumSafari = installedAppiumDrivers.stderr.match(
      /\n.*safari.*installed \(npm\).*\n/
    );

    if (safariVersion.exitCode === 0 && appiumSafari) {
      apps.push({ name: "safari", version: safariVersion, path: "" });
    }
  }

  // Return to original working directory after finishing with `BROWSERS`
  process.chdir(cwd);

  // TODO
  // Detect Android Studio
  // Detect iOS Simulator

  return apps;
}
