---
title: specification
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

# specification
{: .no_toc}

## Description



## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. Unique identifier for the test specification. | 
description | string |  Optional. Description of the test specification. | 
contexts | array of object([context](/reference/schemas/context)) |  Optional. Application/platform sets to run tests in. Overrides `contexts` defined at the config-level. | 
tests | array of object([test](/reference/schemas/test)) |  Required. [Tests](/reference/schemas/test) to perform. | 

## Examples

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "checkLink",
          "url": "https://www.duckduckgo.com"
        }
      ]
    }
  ]
}
```

```json
{
  "id": "Do all the things! - Spec",
  "contexts": [
    {
      "app": {
        "name": "chrome",
        "path": "/usr/bin/firefox"
      },
      "platforms": [
        "windows",
        "mac"
      ]
    }
  ],
  "tests": [
    {
      "id": "Do all the things! - Test",
      "description": "This test includes nearly every property across all actions.",
      "contexts": [
        {
          "app": {
            "name": "firefox",
            "path": "/usr/bin/firefox"
          },
          "platforms": [
            "linux"
          ]
        }
      ],
      "steps": [
        {
          "action": "setVariables",
          "path": ".env"
        },
        {
          "action": "runShell",
          "command": "echo",
          "args": [
            "$USER"
          ]
        },
        {
          "action": "checkLink",
          "url": "https://www.duckduckgo.com"
        },
        {
          "action": "httpRequest",
          "url": "https://reqres.in/api/users",
          "method": "post",
          "requestData": {
            "name": "morpheus",
            "job": "leader"
          },
          "responseData": {
            "name": "morpheus",
            "job": "leader"
          },
          "statusCodes": [
            200,
            201
          ]
        },
        {
          "action": "goTo",
          "url": "https://www.duckduckgo.com"
        },
        {
          "action": "find",
          "selector": "[title=Search]",
          "timeout": 10000,
          "matchText": "Search",
          "moveTo": true,
          "click": true,
          "typeKeys": {
            "keys": [
              "shorthair cat"
            ]
          }
        },
        {
          "action": "typeKeys",
          "keys": [
            "$ENTER$"
          ]
        },
        {
          "action": "saveScreenshot"
        }
      ]
    }
  ]
}
```
