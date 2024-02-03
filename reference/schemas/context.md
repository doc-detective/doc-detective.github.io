---
title: context
layout: default
nav_order: 1
parent: Reference
---

<details open markdown="block">
<summary>
Table of contents
</summary>
{: .text-delta }
- TOC
{:toc}
</details>

# context
{: .no_toc}

## Description

An application and supported platforms.

If no contexts are specified but a context is required by one or more tests, Doc Detective attempts to identify a supported context in the current environment and run tests against it. For browsers, context priority is Firefox > Chrome > Chromium.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
app | object |  Required. The application to run. | 
app.name | string |  Required. Name of the application.<br><br>Accepted values: `chrome`, `firefox`, `safari`, `edge` | 
app.path | string |  Optional. Path to the application. If not specified, defaults to typical install paths per platform. If specified but the path is invalid, the context is skipped. | 
app.options | object |  Optional. Options to pass to the app. Only works when `name` is `firefox` or `chrome`. | 
app.options.width | integer |  Optional. Width of the window in pixels. | 
app.options.height | integer |  Optional. Height of the window in pixels. | 
app.options.headless | boolean |  Optional. If `true`, runs the browser in headless mode. Not supported by Safari. | 
app.options.driverPath | string |  Optional. Path to the browser driver. If not specified, defaults to internally managed dependencies. | 
platforms | array of strings |  Required. Supported platforms for the application. | 

## Examples

```json
{
  "app": {
    "name": "chrome"
  },
  "platforms": [
    "linux"
  ]
}
```

```json
{
  "app": {
    "name": "firefox",
    "options": {
      "width": 800,
      "height": 600,
      "headless": false,
      "driverPath": "/usr/bin/geckodriver"
    }
  },
  "platforms": [
    "linux",
    "windows",
    "mac"
  ]
}
```

```json
{
  "app": {
    "name": "safari"
  },
  "platforms": [
    "mac"
  ]
}
```

```json
{
  "app": {
    "name": "firefox",
    "path": "/usr/bin/firefox"
  },
  "platforms": [
    "linux"
  ]
}
```
