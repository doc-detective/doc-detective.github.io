---
title: goTo
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Navigate to a specified URL.
---

# goTo

The `goTo` action navigates the browser to a specified URL. This is typically used to start a test at a specific page or navigate between pages during a test.

You can specify the target URL directly as a string, or use an object for more options:

- **String Shorthand:** Provide the full URL, a path (starting with `/`), or a variable reference directly as the value for the `goTo` key. If a path is provided, it navigates relative to the current URL or the global `origin` if set in the configuration.
- **Object Format:** Use an object with the following properties:
  - `url`: (Required) The URL to navigate to. Can be a full URL, a path, or a variable reference.
  - `origin`: (Optional) Protocol and domain prepended to `url` when `url` is a path. Overrides the global `origin` if set.

> For comprehensive options, see the [`goTo`](/docs/references/schemas/goto) reference.

## Examples

Here are a few ways you might use the `goTo` action:

### Navigate to a full URL (string shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Navigate to example.com.",
          "goTo": "https://example.com"
        }
      ]
    }
  ]
}
```

### Navigate to a relative path (string shorthand)

Assumes the browser is currently at `https://example.com` or a global `origin` is set.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Navigate to the /about path.",
          "goTo": "/about"
        }
      ]
    }
  ]
}
```

### Navigate using an object with a full URL

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Navigate to example.com using object format.",
          "goTo": {
            "url": "https://example.com"
          }
        }
      ]
    }
  ]
}
```

### Navigate using an object with a relative path and specific origin

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Navigate to Google search using a specific origin.",
          "goTo": {
            "url": "/search",
            "origin": "https://www.google.com"
          }
        }
      ]
    }
  ]
}
```
