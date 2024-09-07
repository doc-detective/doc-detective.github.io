---
title: setVariables
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
---

# setVariables

The `setVariables` action sets environment variables from a `.env` file. This action is useful for accessing sensitive information, such as API keys or other credentials, without hardcoding them into your tests.

> For comprehensive options, see the [`setVariables`](/docs/references/schemas/setVariables) reference.

## Example

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Set environment variables from a .env file.",
          "action": "setVariables",
          "path": "./secrets.env"
        }
      ]
    }
  ]
}
```