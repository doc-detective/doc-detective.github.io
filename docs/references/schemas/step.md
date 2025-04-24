
# step

A step in a test.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
stepId | string |  Optional. ID of the step. | 
description | string |  Optional. Description of the step. | 
outputs | object |  Optional. Outputs from step processes and user-defined expressions. Use the `outputs` object to reference outputs in subsequent steps. If a user-defined output matches the key for a step-defined output, the user-defined output takes precedence. | ``{}``
variables | object |  Optional. Environment variables to set from user-defined expressions. | ``{}``
checkLink | One of<br/>-&nbsp;string<br/>-&nbsp;object |  Optional. No description provided. | 
click | One of<br/>-&nbsp;string([Find element (simple)](/docs/references/schemas/Find element (simple)))<br/>-&nbsp;object([Click element (detailed)](/docs/references/schemas/Click element (detailed)))<br/>-&nbsp;boolean |  Optional. Click or tap an element. | 
find | One of<br/>-&nbsp;string([Find element (simple)](/docs/references/schemas/Find element (simple)))<br/>-&nbsp;object([Find element (detailed)](/docs/references/schemas/Find element (detailed))) |  Optional. Find an element based on display text or a selector, then optionally interact with it. | 
goTo | One of<br/>-&nbsp;string<br/>-&nbsp;object |  Optional. No description provided. | 
httpRequest | One of<br/>-&nbsp;string([URL](/docs/references/schemas/URL))<br/>-&nbsp;object |  Optional. Perform a generic HTTP request, for example to an API. | 
runShell | One of<br/>-&nbsp;string<br/>-&nbsp;object |  Optional. Perform a native shell command. | 
runCode | object |  Optional. Assemble and run code. | 
runCode.language | string |  Optional. Language of the code to run.<br/><br/>Accepted values: `python`, `bash`, `javascript` | 
runCode.code | string |  Optional. Code to run. | 
runCode.args | array of string |  Optional. Arguments for the command. | ``[]``
runCode.workingDirectory | string |  Optional. Working directory for the command. | `.`
runCode.exitCodes | array of integer |  Optional. Expected exit codes of the command. If the command's actual exit code isn't in this list, the step fails. | ``[0]``
runCode.stdio | string |  Optional. Content expected in the command's output. If the expected content can't be found in the command's output (either stdout or stderr), the step fails. Supports strings and regular expressions. To use a regular expression, the string must start and end with a forward slash, like in `/^hello-world.*/`. | 
runCode.path | string |  Optional. File path to save the command's output, relative to `directory`. | 
runCode.directory | string |  Optional. Directory to save the command's output. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
runCode.maxVariation | number |  Optional. Allowed variation in percentage of text different between the current output and previously saved output. If the difference between the current output and the previous output is greater than `maxVariation`, the step fails. If output doesn't exist at `path`, this value is ignored. | `0`
runCode.overwrite | string |  Optional. If `true`, overwrites the existing output at `path` if it exists.
If `aboveVariation`, overwrites the existing output at `path` if the difference between the new output and the existing output is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`
runCode.timeout | integer |  Optional. Max time in milliseconds the command is allowed to run. If the command runs longer than this, the step fails. | `60000`
type | object |  Optional. Type keys. To type special keys, begin and end the string with `$` and use the special key's keyword. For example, to type the Escape key, enter `$ESCAPE$`. | 
type.keys | One of<br/>-&nbsp;string<br/>-&nbsp;array of string |  Optional. Sequence of keys to enter. | 
type.inputDelay | number |  Optional. Delay in milliseconds between each key press during a recording | `100`
type.selector | string |  Optional. Selector for the element to type into. If not specified, the typing occurs in the active element. | 
screenshot | One of<br/>-&nbsp;string<br/>-&nbsp;object<br/>-&nbsp;boolean |  Optional. Takes a screenshot in PNG format. | 
record | One of<br/>-&nbsp;string<br/>-&nbsp;object<br/>-&nbsp;boolean |  Optional. Start recording the current browser viewport. Must be followed by a `stopRecord` step. Only runs in Chrome browsers when they are visible. Supported extensions: [ '.mp4', '.webm', '.gif' ] | 
stopRecord | boolean |  Optional. Stop the current recording. | 
loadVariables | string |  Optional. Load environment variables from the specified `.env` file. | 
wait | One of<br/>-&nbsp;number<br/>-&nbsp;string<br/>-&nbsp;boolean |  Optional. Pause (in milliseconds) before performing the next action. | `5000`

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
