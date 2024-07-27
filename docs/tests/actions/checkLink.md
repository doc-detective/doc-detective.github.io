---
title: checkLink
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
---

# checkLink

The `checkLink` action checks if a URL returns an acceptable status code from a GET request. This action is useful for verifying that a hyperlink or image URL is valid.

You can also specify

- an `origin` to navigate to a URL relative to a specific path.
- `statusCodes` to set acceptable HTTP status codes.

> For comprehensive options, see the [checkLink](/docs/schemas/checkLink) reference.

## Examples

Here are a few ways you might you the `checkLink` action:

### Check if a link is valid

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up.",   
          "action": "checkLink",
          "url": "https://www.google.com"
        }
      ],
    }
  ]
}
```

### Check for one of a set of status code responses

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up with extra status codes.",
          "action": "checkLink",
          "url": "https://www.google.com",
          "statusCodes": [
            200,
            201,
            202
          ]
        }
      ]
    }
  ]
}
```

### Check a link with a separate origin and URL path

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up with an origin.",
          "action": "checkLink",
          "url": "/search",
          "origin": "https://www.google.com"
        }
      ]
    }
  ]
}
```