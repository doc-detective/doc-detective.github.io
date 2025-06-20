---
title: loadVariables
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Load environment variables from a .env file.
---

# loadVariables

The `loadVariables` action loads environment variables from a specified `.env` file. This action is useful for accessing sensitive information, such as API keys or other credentials, without hardcoding them into your tests. Variables loaded this way are available for use in subsequent steps within the same test.

> You can also load globally applicable variables using the `loadVariables` property in the configuration file. This makes them available across all tests.
>
> For comprehensive options, see the [`loadVariables`](/docs/references/schemas/loadvariables) reference.

## Example

Assuming a file named `secrets.env` exists in the same directory as the test file or at the specified path:

```env title="secrets.env"
API_KEY=your_secret_api_key
BASE_URL=https://api.example.com
```

You can load these variables using the `loadVariables` action:

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Load environment variables from secrets.env.",
          "loadVariables": "./secrets.env"
        },
        {
          "description": "Use the loaded API key in an HTTP request.",
          "httpRequest": {
            "url": "$BASE_URL/data", // Use loaded BASE_URL
            "method": "GET",
            "request": {
              "headers": {
                "Authorization": "Bearer $API_KEY" // Use loaded API_KEY
              }
            }
          }
        }
      ]
    }
  ]
}
```
