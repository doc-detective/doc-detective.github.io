---
title: test
layout: default
nav_order: 1
parent: Reference
---

# test

A Doc Detective test.

## Fields

Field | Type | Description
:-- | :-- | :--
id | string | Unique identifier for the test.
description | string | Description of the test.
contexts | array | Application/platform sets to run the test in. Overrides `contexts` defined at the config-level and spec-level.
steps | array | undefined

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
