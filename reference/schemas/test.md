---
title: test
layout: default
nav_order: 1
parent: Reference
---

# test

A Doc Detective test.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. Unique identifier for the test. | Generated UUID
description | string |  Optional. Description of the test. | 
contexts | array of object([context](/reference/schemas/context)) |  Optional. Application/platform sets to run the test in. Overrides `contexts` defined at the config-level and spec-level. | 
steps | array of <br>-&nbsp;object([checkLink](/reference/schemas/checkLink))<br>-&nbsp;object([goTo](/reference/schemas/goTo))<br>-&nbsp;object([httpRequest](/reference/schemas/httpRequest))<br>-&nbsp;object([runShell](/reference/schemas/runShell))<br>-&nbsp;object([saveScreenshot](/reference/schemas/saveScreenshot))<br>-&nbsp;object([setVariables](/reference/schemas/setVariables))<br>-&nbsp;object([typeKeys](/reference/schemas/typeKeys))<br>-&nbsp;object([find](/reference/schemas/find))<br>-&nbsp;object([wait](/reference/schemas/wait)) |  Required. Actions to perform as part of the test. Performed in the sequence defined. If one or more actions fail, the test fails. | 

## Examples

```json
{
  "steps": [
    {
      "action": "checkLink",
      "url": "https://www.duckduckgo.com"
    }
  ]
}
```

```json
{
  "steps": [
    {
      "action": "goTo",
      "url": "https://www.duckduckgo.com"
    },
    {
      "action": "find",
      "selector": "[title=Search]",
      "click": true,
      "typeKeys": {
        "keys": [
          "shorthair cats",
          "$ENTER$"
        ]
      }
    }
  ]
}
```

```json
{
  "id": "Do all the things! - Test",
  "description": "This test includes every property across all actions.",
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
```
