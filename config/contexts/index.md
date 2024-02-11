---
title: Contexts
layout: default
nav_order: 1
parent: Configuration
---

# Contexts

Doc Detective uses contexts to determine which tests to run. A context is a set of conditions that must be met in order for a test to run. For example, a context might specify that a test should only run in Safari on macOS.

Each context is name up of an `app` object and a `platforms` array. When Doc Detective runs tests, it checks the associated contexts to see if the app is available and if it's running on a specified platform. If the conditions are met, the test runs in that context. You can specify multiple contexts for a test, and Doc Detective will run the test in each context that is met.

For comprehensive options, see the [context](/reference/schemas/context) reference.

## Specifying contexts

You can specify contexts at three different levels, in order of precedence:

- **Config**: You can specify contexts in the [`config`](/reference/schemas/config) object. These contexts apply to all tests in the suite.
- **Spec**: You can specify contexts in a [`specification`](/reference/schemas/specification) object. These contexts override config-level contexts and apply to all tests in the spec.
- **Test**: You can specify contexts in a [`test`](/reference/schemas/test) object. These contexts override config- and spec-level contexts and apply only to that test.

When you specify contexts, you use a `contexts` array. For example, the following JSON specifies three contexts:

```json
{
  ...
  "contexts": [
    {
      "app": {
        "name": "chrome"
      },
      "platforms": ["windows","mac","linux"]
    },
    {
      "app": {
        "firefox"
      },
      "platforms": ["windows","mac","linux"]
    },
    {
      "app": {
        "name": "safari"
      },
      "platforms": ["mac"]
    }
  ],
  ...
}
```

## Apps

Doc Detective can perform tests on a variety of apps. The following apps are supported:

- [Chrome](#chrome) (`chrome`)
- [Firefox](#firefox) (`firefox`)
- [Safari](#safari) (`safari`)
- [Edge](#edge) (`edge`)

### Chrome

Chrome is available on Windows, macOS, and Linux. Doc Detective manages and runs a Chrome instance internally, so you don't need to install anything extra.

Chrome is the only browser that supports recording test runs with the [`startRecording`](/reference/schemas/startRecording) action.

Here's a basic Chrome context:

```json
{
  "app": {
    "name": "chrome"
  },
  "platforms": ["windows","mac","linux"]
}
```

#### Dimensions and visibility

You can specify the browser dimensions and visibility (`headless`) during tests. `headless` must be `false` to record test runs.

```json
{
  "app": {
    "name": "chrome",
    "options": {
      "width": 1024,
      "height": 768,
      "headless": false
    }
  },
  "platforms": ["windows","mac","linux"]
}
```

#### Custom path

You can specify a Chrome installation on your system if you want to use a specific version of Chrome or a Chromium derivative. If you specify a custom path, you must also specify a path to a matching ChromeDriver executable. For example:

```json
{
  "app": {
    "name": "chrome",
    "options": {
      "path": "/path/to/chrome",
      "driverPath": "/path/to/chromedriver"
    }
  },
  "platforms": ["windows","mac","linux"]
}
```

### Firefox

Firefox is available on Windows, macOS, and Linux. Doc Detective manages and runs a Firefox instance internally, so you don't need to install anything extra.

Here's a basic Firefox context:

```json
{
  "app": {
    "name": "firefox"
  },
  "platforms": ["windows","mac","linux"]
}
```

#### Dimensions and visibility

You can specify the browser dimensions and visibility (`headless`) during tests.

```json
{
  "app": {
    "name": "chrome",
    "options": {
      "width": 1024,
      "height": 768,
      "headless": false
    }
  },
  "platforms": ["windows","mac","linux"]
}
```

#### Custom path

You can specify a Firefox installation on your system if you want to use a specific version of Firefox or a Firefox derivative. For example:

```json
{
  "app": {
    "name": "firefox",
    "options": {
      "path": "/path/to/firefox"
    }
  },
  "platforms": ["windows","mac","linux"]
}
```

### Safari

Safari is only available on macOS. Doc Detective runs tests in a sandboxed instance of your local Safari browser.

Before you run tests on Safari, you need to enable SafariDriver with the following command in a terminal:

```bash
safaridriver --enable
```

**Note:** SafariDriver is enabled by default in GitHub Actions.

If Doc Detective isn't running tests in Safari, make sure
- SafariDriver is enabled.
- the **Enable automation** option is selected the Safari's **Develop** menu.

#### Dimensions

You can specify the browser dimensions during tests.

**Note:** Safari doesn't support headless mode.

```json
{
  "app": {
    "name": "safari",
    "options": {
      "width": 1024,
      "height": 768,
    }
  },
  "platforms": ["mac"]
}
```

### Edge

Edge is available on Windows, macOS, and Linux. edge is installed by default on Windows, but you must manually install it on macOS and Linux. If Edge is installed, Doc Detective can automatically detect and run tests in your local installation.

Here's a basic Edge context:

```json
{
  "app": {
    "name": "edge"
  },
  "platforms": ["windows","mac","linux"]
}
```

#### Dimensions and visibility

You can specify the browser dimensions and visibility (`headless`) during tests.

```json
{
  "app": {
    "name": "edge",
    "options": {
      "width": 1024,
      "height": 768,
      "headless": false
    }
  },
  "platforms": ["windows","mac","linux"]
}
```

## Platforms

Doc Detective can perform tests on a variety of platforms. The following platforms are supported:

- Windows (`windows`)
- macOS (`mac`)
- Linux (tested on Ubuntu) (`linux`)

When you specify a platform for a context, Doc Detective attempts to run associated tests when the context is executed on that platform. If a platform isn't specified, Doc Detective attempts to run the tests on all platforms.

For example, the following context specifies that tests should only run on macOS:

```json
{
  "app": {
    "name": "chrome"
  },
  "platforms": ["mac"]
}
```

## Examples

Here are some examples of contexts:

- Run tests in Chrome on Windows, macOS, and Linux:

  ```json
  {
    "app": {
      "name": "chrome"
    },
    "platforms": ["windows","mac","linux"]
  }
  ```

- Run tests in Firefox on Windows and macOS:

  ```json
  {
    "app": {
      "name": "firefox"
    },
    "platforms": ["windows","mac"]
  }
  ```

- Run tests in Safari on macOS:

  ```json
  {
    "app": {
      "name": "safari"
    },
    "platforms": ["mac"]
  }
  ```

- Run tests in Edge on Windows:

  ```json
  {
    "app": {
      "name": "edge"
    },
    "platforms": ["windows"]
  }
  ```