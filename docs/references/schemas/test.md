
# test

A Doc Detective test.

## Referenced In

- [specification](/docs/references/schemas/specification)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
testId | string | Optional. Unique identifier for the test. | 
description | string | Optional. Description of the test. | 
contentPath | string | Optional. Path to the content that the test is associated with. | 
detectSteps | boolean | Optional. Whether or not to detect steps in input files based on markup regex. | `true`
runOn | array of object([context](/docs/references/schemas/context)) | Optional. Contexts to run the test in. Overrides contexts defined at the config and spec levels. | 
openApi | array of unknown | Optional. No description provided. | 
before | string | Optional. Path to a test specification to perform before this test, while maintaining this test's context. Useful for setting up testing environments. Only the `steps` property is used from the first test in the setup spec. | 
after | string | Optional. Path to a test specification to perform after this test, while maintaining this test's context. Useful for cleaning up testing environments. Only the `steps` property is used from the first test in the cleanup spec. | 
debug | one of:<br/>- boolean<br/>- string | Optional. Enable debugging mode for this test. Overrides the debug setting from config and spec levels. `true` allows pausing on breakpoints, waiting for user input before continuing. `stepThrough` pauses at every step, waiting for user input before continuing. `false` disables all debugging for this test.<br/><br/>Accepted values: `false`, `true`, `stepThrough` | 
steps | array of object(step) | Optional. Steps to perform as part of the test. Performed in the sequence defined. If one or more actions fail, the test fails. By default, if a step fails, the test stops and the remaining steps are not executed. | 
contexts | array of object([Resolved context](/docs/references/schemas/resolved-context)) | ReadOnly. Resolved contexts to run the test in. This is a resolved version of the `runOn` property. It is not user-defined and should not be used in test specifications. | 

## Examples

```json
{
  "steps": [
    {
      "checkLink": "https://www.duckduckgo.com"
    }
  ]
}
```

```json
{
  "steps": [
    {
      "goTo": {
        "url": "https://www.duckduckgo.com"
      }
    },
    {
      "find": {
        "selector": "[title=Search]",
        "click": true,
        "type": {
          "keys": [
            "shorthair cats",
            "$ENTER$"
          ]
        }
      }
    }
  ]
}
```

```json
{
  "testId": "Do all the things! - Test",
  "description": "This test includes every property across all actions.",
  "before": "setup.json",
  "after": "cleanup.json",
  "runOn": [
    {
      "platforms": [
        "linux"
      ],
      "browsers": {
        "name": "firefox",
        "window": {},
        "viewport": {}
      }
    }
  ],
  "steps": [
    {
      "loadVariables": ".env"
    },
    {
      "runShell": {
        "command": "echo",
        "args": [
          "$USER"
        ],
        "maxVariation": 0,
        "overwrite": "aboveVariation"
      },
      "variables": {}
    },
    {
      "checkLink": {
        "url": "https://www.duckduckgo.com"
      }
    },
    {
      "httpRequest": {
        "method": "post",
        "url": "https://reqres.in/api/users",
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
        "maxVariation": 0,
        "overwrite": "aboveVariation"
      },
      "variables": {}
    },
    {
      "goTo": {
        "url": "https://www.duckduckgo.com"
      }
    },
    {
      "find": {
        "selector": "[title=Search]",
        "elementText": "Search",
        "timeout": 10000,
        "moveTo": true,
        "click": true,
        "type": {
          "keys": [
            "shorthair cat"
          ]
        }
      },
      "variables": {}
    },
    {
      "type": {
        "keys": [
          "$ENTER$"
        ]
      }
    },
    {
      "screenshot": {
        "maxVariation": 0,
        "overwrite": "aboveVariation"
      }
    }
  ],
  "detectSteps": true
}
```

```json
{
  "testId": "c61b02e8-7485-44d3-8065-f873673379c6",
  "openApi": [
    {
      "descriptionPath": "https://www.acme.com/openapi.json",
      "server": "https://api.acme.com",
      "validateAgainstSchema": "both",
      "useExample": "none",
      "exampleKey": "",
      "name": "Acme"
    }
  ],
  "steps": [
    {
      "httpRequest": {
        "openApi": {
          "operationId": "getUserById",
          "validateAgainstSchema": "both",
          "useExample": "none",
          "exampleKey": ""
        },
        "request": {
          "parameters": {
            "id": 123
          }
        },
        "response": {},
        "maxVariation": 0,
        "overwrite": "aboveVariation"
      },
      "variables": {}
    }
  ],
  "detectSteps": true
}
```

```json
{
  "testId": "debug-test-basic",
  "description": "Test with debug mode enabled",
  "debug": true,
  "steps": [
    {
      "checkLink": "https://www.google.com"
    }
  ]
}
```

```json
{
  "testId": "debug-test-step-through",
  "description": "Test with step-through debug mode",
  "debug": "stepThrough",
  "steps": [
    {
      "goTo": "https://www.google.com"
    },
    {
      "find": {
        "selector": "[name='q']"
      }
    }
  ]
}
```

```json
{
  "testId": "critical-test",
  "description": "Test with debug mode and step breakpoints",
  "debug": "stepThrough",
  "steps": [
    {
      "checkLink": "https://api.example.com",
      "breakpoint": true
    }
  ]
}
```
