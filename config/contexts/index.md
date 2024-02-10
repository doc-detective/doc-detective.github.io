---
title: Contexts
layout: default
nav_order: 4
parent: Configuration
---

# Contexts

Doc Detective uses contexts to determine which tests to run. A context is a set of conditions that must be met in order for a test to run. For example, a context might specify that a test should only run in Safari on macOS.

Each context is name up of an `app` and a `platform` array. When Doc Detective runs tests, it checks the associated contexts to see if the app is available and if it's running on a specified platform. If the conditions are met, the test runs in that context. You can specify multiple contexts for a test, and Doc Detective will run the test in each context that is met.

## Specifying contexts

You can specify contexts at three different levels, in order of precedence:

- **Config**: You can specify contexts in the `config` object. These contexts apply to all tests in the suite.
- **Spec**: You can specify contexts in a [test specification](/reference/schemas/specification) object. These contexts override config-level contexts and apply to all tests in the spec.
- **Test**: You can specify contexts in a [test](/reference/schemas/test) object. These contexts override config- and spec-level contexts and apply only to that test.

When you specify contexts, you use a `contexts` array. For example:

```json
{
  "contexts": [
    {
      "app": "chrome",
      "platform": ["windows","mac","linux"]
    },
    {
      "app": "firefox",
      "platform": ["windows","mac","linux"]
    }
]
}
```

## Apps

Doc Detective can perform tests on a variety of apps. The following apps are supported:

- Chrome (`chrome`)
- Firefox (`firefox`)
- Safari (`safari`)
- Edge (`edge`)

### Chrome

Chrome is the default browser for Doc Detective, and Doc Detective manages a Chrome instance internally, so you don't need to install anything extra.

#### Custom path

You can specify a Chrome installation on your system if you want to use a specific version of Chrome or a Chromium derivative.

### Firefox

### Safari

### Edge

## Platforms

Doc Detective can perform tests on a variety of platforms. The following platforms are supported:

- Windows (`windows`)
- macOS (`mac`)
- Linux (tested on Ubuntu) (`linux`)

When you specify a platform for a context, Doc Detective attempts to run associated tests when the context is executed on that platform. If a platform isn't specified, Doc Detective attempts to run the tests on all platforms.