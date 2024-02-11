---
title: goTo
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
---

# goTo

The `goTo` action navigates to a URL. This action is useful for starting a test at a specific page.

You can also specify an `origin` to navigate to a URL relative to a specific path.

## Examples

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Navigate to example.com",
          "action": "goTo",
          "url": "https://example.com"
        }
      ]
    }
  ]
}
```