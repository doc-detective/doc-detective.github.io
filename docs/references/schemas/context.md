
# context

A context in which to perform tests. If no contexts are specified but a context is required by one or more tests, Doc Detective attempts to identify a supported context in the current environment and run tests against it. For example, if a browser isn't specified but is required by steps in the test, Doc Detective will search for and use a supported browser available in the current environment.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
contextId | string | Optional. Unique identifier for the context. | 
platforms | string | Optional. Platforms to run tests on.<br/><br/>Accepted values: `linux`, `mac`, `windows` | 
platforms | array of string | Optional. Platforms to run tests on. | 
browsers | string | Optional. Name of the browser.<br/><br/>Accepted values: `chrome`, `firefox`, `safari`, `webkit` | 
browsers | object | Optional. Browser configuration. | 
browsers.name | string | Required. Name of the browser.<br/><br/>Accepted values: `chrome`, `firefox`, `safari`, `webkit` | 
browsers.headless | boolean | Optional. If `true`, runs the browser in headless mode. | `true`
browsers.window | object | Optional. Browser dimensions. | 
browsers.window.width | integer | Optional. Width of the browser window in pixels. | 
browsers.window.height | integer | Optional. Height of the browser window in pixels. | 
browsers.viewport | object | Optional. Viewport dimensions. | 
browsers.viewport.width | integer | Optional. Width of the viewport in pixels. | 
browsers.viewport.height | integer | Optional. Height of the viewport in pixels. | 
browsers | array of one of: string, object | Optional. Browsers to run tests on. | 
browsers[].name | string | Required. Name of the browser.<br/><br/>Accepted values: `chrome`, `firefox`, `safari`, `webkit` | 
browsers[].headless | boolean | Optional. If `true`, runs the browser in headless mode. | `true`
browsers[].window | object | Optional. Browser dimensions. | 
browsers[].viewport | object | Optional. Viewport dimensions. | 

## Examples

```json
{
  "platforms": "linux",
  "browsers": "chrome"
}
```

```json
{
  "platforms": [
    "windows",
    "mac",
    "linux"
  ],
  "browsers": [
    "chrome",
    "firefox",
    "webkit"
  ]
}
```

```json
{
  "browsers": {
    "name": "chrome",
    "headless": true
  }
}
```

```json
{
  "browsers": [
    {
      "name": "chrome",
      "headless": true
    },
    {
      "name": "firefox"
    }
  ]
}
```

```json
{
  "platforms": [
    "mac",
    "linux"
  ],
  "browsers": {
    "name": "chrome",
    "headless": true
  }
}
```

```json
{
  "platforms": [
    "windows",
    "mac",
    "linux"
  ],
  "browsers": [
    {
      "name": "chrome",
      "headless": true,
      "window": {
        "width": 1920,
        "height": 1080
      },
      "viewport": {
        "width": 1600,
        "height": 900
      }
    },
    {
      "name": "firefox",
      "window": {
        "width": 1366,
        "height": 768
      }
    },
    {
      "name": "webkit",
      "headless": false,
      "viewport": {
        "width": 1440,
        "height": 900
      }
    }
  ]
}
```

```json
{
  "platforms": "mac",
  "browsers": [
    {
      "name": "safari",
      "window": {
        "width": 1280,
        "height": 800
      }
    }
  ]
}
```
