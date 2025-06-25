
# step

A step in a test.

## Fields

> **Note:** The following action properties are mutually exclusive. You can only use one of these in a single step:
> 
> `checkLink`, `click`, `find`, `goTo`, `httpRequest`, `runShell`, `runCode`, `type`, `screenshot`, `record`, `stopRecord`, `loadVariables`, `wait`

Field | Type | Description | Default
:-- | :-- | :-- | :--
stepId | string | Optional. ID of the step. | 
description | string | Optional. Description of the step. | 
outputs | object | Optional. Outputs from step processes and user-defined expressions. Use the `outputs` object to reference outputs in subsequent steps. If a user-defined output matches the key for a step-defined output, the user-defined output takes precedence. | ``{}``
variables | object | Optional. Environment variables to set from user-defined expressions. | ``{}``
breakpoint | boolean | Optional. Whether or not this step should act as a breakpoint when debugging is enabled. When `true`, execution will pause at this step when debug mode is enabled. | `false`
checkLink | string | Required. Check if an HTTP or HTTPS URL returns an acceptable status code from a GET request.<br/><br/>Pattern: `(^(http://|https://|\/).*|\$[A-Za-z0-9_]+$)` | 
checkLink | object | Required. Check if an HTTP or HTTPS URL returns an acceptable status code from a GET request. | 
checkLink.url | string | Required. URL to check. Can be a full URL or a path. If a path is provided, `origin` must be specified.<br/><br/>Pattern: `(^(http://|https://|/).*|\$[A-Za-z0-9_]+)` | 
checkLink.origin | string | Optional. Protocol and domain to navigate to. Prepended to `url`. | 
checkLink.statusCodes | integer | Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | 
checkLink.statusCodes | array of integer | Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | 
click | string | Required. Display text or selector of the element to find. | 
click | object | Required. Click or tap an element. | 
click.button | string | Optional. Kind of click to perform.<br/><br/>Accepted values: `left`, `right`, `middle` | 
click.elementText | string | Optional. Display text of the element to click. If combined with `selector`, the element must match both the text and the selector. | 
click.selector | string | Optional. Selector of the element to click. If combined with `elementText`, the element must match both the text and the selector. | 
click | boolean | Required. Click or tap an element. | 
find | string | Required. Display text or selector of the element to find. | 
find | object | Required. Find an element based on display text or a selector, then optionally interact with it. | 
find.elementText | string | Optional. Display text of the element to find. If combined with `selector`, the element must match both the text and the selector. | 
find.selector | string | Optional. Selector of the element to find. If combined with `elementText`, the element must match both the text and the selector. | 
find.timeout | integer | Optional. Max duration in milliseconds to wait for the element to exist. | `5000`
find.moveTo | boolean | Optional. Move to the element. If the element isn't visible, it's scrolled into view. | `true`
find.click | object([click](/docs/references/schemas/click)) | Optional. Click or tap an element. | 
find.click | object | Optional. Click the element. | 
find.click.button | string | Optional. Kind of click to perform.<br/><br/>Accepted values: `left`, `right`, `middle` | 
find.type | unknown | Optional. Type keys after finding the element. Either a string or an object with a `keys` field as defined in [`type`](type). To type in the element, make the element active with the `click` parameter. | 
goTo | string | Required. Navigate to an HTTP or HTTPS URL. Can be a full URL or a path. If a path is provided, navigates relative to the current URL, if any.<br/><br/>Pattern: `(^(http://|https://|/).*|\$[A-Za-z0-9_]+)` | 
goTo | object | Required. Navigate to an HTTP or HTTPS URL. | 
goTo.url | string | Required. URL to navigate to. Can be a full URL or a path. If a path is provided and `origin` is specified, prepends `origin` to `url`. If a path is provided but `origin` isn't specified, attempts to navigate relative to the current URL, if any.<br/><br/>Pattern: `(^(http://|https://|/).*|\$[A-Za-z0-9_]+)` | 
goTo.origin | string | Optional. Protocol and domain to navigate to. Prepended to `url`. | 
httpRequest | string | Required. URL for the HTTP request.<br/><br/>Pattern: `(^(http://|https://).*|\$[A-Za-z0-9_]+)` | 
httpRequest | object | Required. Perform a generic HTTP request, for example to an API. | 
httpRequest.url | string | Optional. URL for the HTTP request.<br/><br/>Pattern: `(^(http://|https://).*|\$[A-Za-z0-9_]+)` | 
httpRequest.openApi | unknown | Optional. No description provided. | 
httpRequest.statusCodes | array of integer | Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | ``[200,201]``
httpRequest.method | string | Optional. Method of the HTTP request<br/><br/>Accepted values: `get`, `put`, `post`, `patch`, `delete` | `get`
httpRequest.timeout | integer | Optional. Timeout for the HTTP request, in milliseconds. | `60000`
httpRequest.request | object | Optional. No description provided. | 
httpRequest.request.headers | object | Optional. Headers to include in the HTTP request, in key/value format. | ``{}``
httpRequest.request.parameters | object | Optional. URL parameters to include in the HTTP request, in key/value format. | ``{}``
httpRequest.request.body | object | Optional. JSON object to include as the body of the HTTP request. | 
httpRequest.request.body | array of unknown | Optional. JSON object to include as the body of the HTTP request. | 
httpRequest.request.body | string | Optional. JSON object to include as the body of the HTTP request. | 
httpRequest.response | object | Optional. No description provided. | 
httpRequest.response.headers | object | Optional. Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the step fails. | ``{}``
httpRequest.response.body | object | Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | 
httpRequest.response.body | array of unknown | Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | 
httpRequest.response.body | string | Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | 
httpRequest.allowAdditionalFields | boolean | Optional. If `false`, the step fails when the response data contains fields not specified in the response body. | `true`
httpRequest.path | string | Optional. File path to save the command's output, relative to `directory`. Specify a file extension that matches the expected response type, such as `.json` for JSON content or `.txt` for strings. | 
httpRequest.directory | string | Optional. Directory to save the command's output. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
httpRequest.maxVariation | number | Optional. Allowed variation in percentage of text different between the current output and previously saved output. If the difference between the current output and the previous output is greater than `maxVariation`, the step fails. If output doesn't exist at `path`, this value is ignored.<br/><br/>Minimum: 0. Maximum: 1 | `0`
httpRequest.overwrite | string | Optional. If `true`, overwrites the existing output at `path` if it exists.
If `aboveVariation`, overwrites the existing output at `path` if the difference between the new output and the existing output is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`
runShell | string | Required. Perform a native shell command. | 
runShell | object | Required. Perform a native shell command. | 
runShell.command | string | Required. Command to perform in the machine's default shell. | 
runShell.args | array of string | Optional. Arguments for the command. | ``[]``
runShell.workingDirectory | string | Optional. Working directory for the command. | `.`
runShell.exitCodes | array of integer | Optional. Expected exit codes of the command. If the command's actual exit code isn't in this list, the step fails. | ``[0]``
runShell.stdio | string | Optional. Content expected in the command's stdout or stderr. If the expected content can't be found in the command's stdout or stderr, the step fails. Supports strings and regular expressions. To use a regular expression, the string must start and end with a forward slash, like in `/^hello-world.*/`. | 
runShell.path | string | Optional. File path to save the command's output, relative to `directory`. | 
runShell.directory | string | Optional. Directory to save the command's output. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
runShell.maxVariation | number | Optional. Allowed variation in percentage of text different between the current output and previously saved output. If the difference between the current output and the previous output is greater than `maxVariation`, the step fails. If output doesn't exist at `path`, this value is ignored.<br/><br/>Minimum: 0. Maximum: 1 | `0`
runShell.overwrite | string | Optional. If `true`, overwrites the existing output at `path` if it exists.
If `aboveVariation`, overwrites the existing output at `path` if the difference between the new output and the existing output is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`
runShell.timeout | integer | Optional. Max time in milliseconds the command is allowed to run. If the command runs longer than this, the step fails. | `60000`
runCode | object | Required. Assemble and run code. | 
runCode.language | string | Required. Language of the code to run.<br/><br/>Accepted values: `python`, `bash`, `javascript` | 
runCode.code | string | Required. Code to run. | 
runCode.args | array of string | Optional. Arguments for the command. | ``[]``
runCode.workingDirectory | string | Optional. Working directory for the command. | `.`
runCode.exitCodes | array of integer | Optional. Expected exit codes of the command. If the command's actual exit code isn't in this list, the step fails. | ``[0]``
runCode.stdio | string | Optional. Content expected in the command's output. If the expected content can't be found in the command's output (either stdout or stderr), the step fails. Supports strings and regular expressions. To use a regular expression, the string must start and end with a forward slash, like in `/^hello-world.*/`. | 
runCode.path | string | Optional. File path to save the command's output, relative to `directory`. | 
runCode.directory | string | Optional. Directory to save the command's output. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
runCode.maxVariation | number | Optional. Allowed variation in percentage of text different between the current output and previously saved output. If the difference between the current output and the previous output is greater than `maxVariation`, the step fails. If output doesn't exist at `path`, this value is ignored.<br/><br/>Minimum: 0. Maximum: 1 | `0`
runCode.overwrite | string | Optional. If `true`, overwrites the existing output at `path` if it exists.
If `aboveVariation`, overwrites the existing output at `path` if the difference between the new output and the existing output is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`
runCode.timeout | integer | Optional. Max time in milliseconds the command is allowed to run. If the command runs longer than this, the step fails. | `60000`
type | string | Required. Sequence of keys to enter. | 
type | array of string | Required. Sequence of keys to enter. | 
type | object | Required. Type keys. To type special keys, begin and end the string with `$` and use the special key's keyword. For example, to type the Escape key, enter `$ESCAPE$`. | 
type.keys | string | Required. Sequence of keys to enter. | 
type.keys | array of string | Required. Sequence of keys to enter. | 
type.inputDelay | number | Optional. Delay in milliseconds between each key press during a recording | `100`
type.selector | string | Optional. Selector for the element to type into. If not specified, the typing occurs in the active element. | 
screenshot | string | Required. File path of the PNG file. Accepts absolute paths. If not specified, the file name is the ID of the step.<br/><br/>Pattern: `([A-Za-z0-9_-]*\.(png|PNG)$|\$[A-Za-z0-9_]+)` | 
screenshot | object | Required. Takes a screenshot in PNG format. | 
screenshot.path | string | Optional. File path of the PNG file. Accepts absolute paths. If not specified, the file name is the ID of the step.<br/><br/>Pattern: `([A-Za-z0-9_-]*\.(png|PNG)$|\$[A-Za-z0-9_]+)` | 
screenshot.directory | string | Optional. Directory of the PNG file. If the directory doesn't exist, creates the directory. | 
screenshot.maxVariation | number | Optional. Allowed variation in percentage of pixels between the new screenshot and the existing screenshot at `path`. If the difference between the new screenshot and the existing screenshot is greater than `maxVariation`, the step fails. If a screenshot doesn't exist at `path`, this value is ignored.<br/><br/>Minimum: 0. Maximum: 1 | `0.05`
screenshot.overwrite | string | Optional. If `true`, overwrites the existing screenshot at `path` if it exists.
If `aboveVariation`, overwrites the existing screenshot at `path` if the difference between the new screenshot and the existing screenshot is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`
screenshot.crop | string | Optional. Display text or selector of the element to screenshot. | 
screenshot.crop | object | Optional. Crop the screenshot to a specific element. | 
screenshot.crop.elementText | string | Optional. Display text of the element to screenshot. | 
screenshot.crop.selector | string | Optional. Selector of the element to screenshot. | 
screenshot.crop.padding | number | Optional. Padding in pixels to add to the bounds of the element.<br/><br/>Minimum: 0 | 
screenshot.crop.padding | object | Optional. No description provided. | 
screenshot.crop.padding.top | number | Optional. No description provided.<br/><br/>Minimum: 0 | 
screenshot.crop.padding.right | number | Optional. No description provided.<br/><br/>Minimum: 0 | 
screenshot.crop.padding.bottom | number | Optional. No description provided.<br/><br/>Minimum: 0 | 
screenshot.crop.padding.left | number | Optional. No description provided.<br/><br/>Minimum: 0 | 
screenshot | boolean | Required. Takes a screenshot in PNG format. | 
record | string | Required. File path of the recording. Supports the `.mp4`, `.webm`, and `.gif` extensions. If not specified, the file name is the ID of the step, and the extension is `.mp4`.<br/><br/>Pattern: `([A-Za-z0-9_-]*\.(mp4|webm|gif)$|\$[A-Za-z0-9_]+)` | 
record | object | Required. Start recording the current browser viewport. Must be followed by a `stopRecord` step. Only runs in Chrome browsers when they are visible. Supported extensions: [ '.mp4', '.webm', '.gif' ] | 
record.path | string | Optional. File path of the recording. Supports the `.mp4`, `.webm`, and `.gif` extensions. If not specified, the file name is the ID of the step, and the extension is `.mp4`.<br/><br/>Pattern: `([A-Za-z0-9_-]*\.(mp4|webm|gif)$|\$[A-Za-z0-9_]+)` | 
record.directory | string | Optional. Directory of the file. If the directory doesn't exist, creates the directory. | 
record.overwrite | string | Optional. If `true`, overwrites the existing recording at `path` if it exists.<br/><br/>Accepted values: `true`, `false` | 
record | boolean | Required. Start recording the current browser viewport. Must be followed by a `stopRecord` step. Only runs in Chrome browsers when they are visible. Supported extensions: [ '.mp4', '.webm', '.gif' ] | 
stopRecord | boolean | Required. Stop the current recording. | 
loadVariables | string | Required. Load environment variables from the specified `.env` file. | 
wait | number | Required. Pause (in milliseconds) before performing the next action. | 
wait | string | Required. Pause (in milliseconds) before performing the next action.<br/><br/>Pattern: `(\$[A-Za-z0-9_]+)` | 
wait | boolean | Required. Pause (in milliseconds) before performing the next action. | 

## Examples

```json
{
  "stepId": "uuid",
  "description": "Description of the step.",
  "checkLink": "https://www.google.com",
  "outputs": {
    "outputKey": "outputValue"
  },
  "variables": {
    "variableKey": "variableValue"
  }
}
```

```json
{
  "stepId": "breakpoint-example",
  "description": "Step with breakpoint enabled",
  "goTo": "https://www.example.com",
  "breakpoint": true
}
```

```json
{
  "checkLink": "https://www.google.com",
  "breakpoint": false
}
```

```json
{
  "checkLink": "https://www.google.com"
}
```

```json
{
  "stepId": "path-only",
  "checkLink": "/search"
}
```

```json
{
  "stepId": "status-code",
  "checkLink": {
    "url": "https://www.google.com",
    "statusCodes": [
      200
    ]
  }
}
```

```json
{
  "goTo": {
    "url": "https://www.google.com"
  }
}
```

```json
{
  "goTo": "https://www.google.com"
}
```

```json
{
  "wait": 5000
}
```

```json
{
  "runCode": {
    "language": "python",
    "code": "print('Hello from Python')",
    "workingDirectory": ".",
    "exitCodes": [
      0
    ],
    "stdio": "Hello from Python!",
    "path": "python-output.txt",
    "directory": "output",
    "maxVariation": 0.1,
    "overwrite": "aboveVariation"
  }
}
```

```json
{
  "stopRecord": true
}
```

```json
{
  "screenshot": true
}
```

```json
{
  "screenshot": "image.png"
}
```

```json
{
  "screenshot": "static/images/image.png"
}
```

```json
{
  "screenshot": "/User/manny/projects/doc-detective/static/images/image.png"
}
```

```json
{
  "screenshot": {
    "path": "image.png",
    "directory": "static/images",
    "maxVariation": 0.1,
    "overwrite": "aboveVariation",
    "crop": "#elementToScreenshot"
  }
}
```

```json
{
  "screenshot": {
    "path": "image.png",
    "directory": "static/images",
    "maxVariation": 0.1,
    "overwrite": "aboveVariation"
  }
}
```

```json
{
  "screenshot": {
    "path": "image.png",
    "directory": "static/images",
    "maxVariation": 0.1,
    "overwrite": "aboveVariation",
    "crop": {
      "selector": "#elementToScreenshot",
      "elementText": "Element text",
      "padding": {
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0
      }
    }
  }
}
```

```json
{
  "record": true
}
```

```json
{
  "record": "video.mp4"
}
```

```json
{
  "record": "static/media/video.mp4"
}
```

```json
{
  "record": "/User/manny/projects/doc-detective/static/media/video.mp4"
}
```

```json
{
  "record": {
    "path": "video.mp4",
    "directory": "static/media",
    "overwrite": true
  }
}
```

```json
{
  "loadVariables": "variables.env"
}
```

```json
{
  "find": "Find me!"
}
```

```json
{
  "find": {
    "selector": "[title=Search]"
  }
}
```

```json
{
  "find": {
    "selector": "[title=Search]",
    "timeout": 10000,
    "elementText": "Search",
    "moveTo": true,
    "click": true,
    "type": "shorthair cat"
  }
}
```

```json
{
  "find": {
    "selector": "[title=Search]",
    "click": {
      "button": "right"
    }
  }
}
```

```json
{
  "find": {
    "selector": "[title=Search]",
    "timeout": 10000,
    "elementText": "Search",
    "moveTo": true,
    "click": true,
    "type": {
      "keys": [
        "shorthair cat"
      ],
      "inputDelay": 100
    }
  }
}
```

```json
{
  "click": true
}
```

```json
{
  "click": "right"
}
```

```json
{
  "click": {
    "button": "left",
    "elementText": "Element text"
  }
}
```

```json
{
  "click": {
    "selector": "#elementToScreenshot",
    "elementText": "Element text",
    "button": "middle"
  }
}
```

```json
{
  "httpRequest": "https://reqres.in/api/users"
}
```

```json
{
  "httpRequest": {
    "url": "https://reqres.in/api/users"
  }
}
```

```json
{
  "httpRequest": {
    "url": "https://reqres.in/api/users/2",
    "method": "put",
    "request": {
      "body": {
        "name": "morpheus",
        "job": "zion resident"
      }
    }
  }
}
```

```json
{
  "httpRequest": {
    "url": "https://reqres.in/api/users",
    "method": "post",
    "request": {
      "body": {
        "name": "morpheus",
        "job": "leader"
      }
    },
    "response": {
      "body": {
        "name": "morpheus",
        "job": "leader"
      }
    },
    "statusCodes": [
      200,
      201
    ]
  }
}
```

```json
{
  "httpRequest": {
    "url": "https://www.api-server.com",
    "method": "post",
    "timeout": 30000,
    "request": {
      "body": {
        "field": "value"
      },
      "headers": {
        "header": "value"
      },
      "parameters": {
        "param": "value"
      }
    },
    "response": {
      "body": {
        "field": "value"
      },
      "headers": {
        "header": "value"
      }
    },
    "statusCodes": [
      200
    ]
  }
}
```

```json
{
  "httpRequest": {
    "url": "https://reqres.in/api/users",
    "method": "post",
    "request": {
      "body": {
        "name": "morpheus",
        "job": "leader"
      }
    },
    "response": {
      "body": {
        "name": "morpheus",
        "job": "leader"
      }
    },
    "statusCodes": [
      200,
      201
    ],
    "path": "response.json",
    "directory": "media",
    "maxVariation": 0.05,
    "overwrite": "aboveVariation"
  }
}
```

```json
{
  "httpRequest": {
    "openApi": "getUserById"
  }
}
```

```json
{
  "httpRequest": {
    "openApi": {
      "name": "Reqres",
      "operationId": "getUserById"
    },
    "request": {
      "parameters": {
        "id": 123
      }
    }
  }
}
```

```json
{
  "httpRequest": {
    "openApi": {
      "descriptionPath": "https://api.example.com/openapi.json",
      "operationId": "getUserById"
    },
    "request": {
      "parameters": {
        "id": 123
      }
    }
  }
}
```

```json
{
  "httpRequest": {
    "openApi": {
      "descriptionPath": "https://api.example.com/openapi.json",
      "operationId": "createUser",
      "useExample": "both"
    }
  }
}
```

```json
{
  "httpRequest": {
    "openApi": {
      "descriptionPath": "https://api.example.com/openapi.json",
      "operationId": "updateUser",
      "useExample": "request",
      "exampleKey": "acme"
    }
  }
}
```

```json
{
  "httpRequest": {
    "openApi": {
      "descriptionPath": "https://api.example.com/openapi.json",
      "operationId": "updateUser",
      "useExample": "request",
      "exampleKey": "acme",
      "headers": {
        "Authorization": "Bearer $TOKEN"
      }
    }
  }
}
```
