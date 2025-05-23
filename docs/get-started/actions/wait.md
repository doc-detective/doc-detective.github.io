---
title: wait
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Pause before performing the next action.
---

# wait

The `wait` action pauses test execution for a specified duration before proceeding to the next step. This is useful for adding delays, for example, to allow time for animations to complete or to make recordings easier to follow.

The value assigned to the `wait` key is the duration to pause in milliseconds. You can provide a number directly.

> For comprehensive options, see the [`wait`](/docs/references/schemas/wait) reference.

## Examples

### Wait for 3 seconds

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Perform an action.",
          "goTo": "https://example.com"
        },
        {
          "description": "Wait for 3000 milliseconds (3 seconds).",
          "wait": 3000
        },
        {
          "description": "Perform the next action.",
          "screenshot": "after_wait.png"
        }
      ]
    }
  ]
}
```

### Wait for 500 milliseconds

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Click something.",
          "find": {
            "selector": "#myButton",
            "click": true
          }
        },
        {
          "description": "Wait for half a second.",
          "wait": 500
        },
        {
          "description": "Check the result.",
          "find": "Action complete!"
        }
      ]
    }
  ]
}
```
