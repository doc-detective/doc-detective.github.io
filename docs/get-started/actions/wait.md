---
title: wait
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
---

# wait

The `wait` action pauses before performing the next step. This action is useful for waiting a set duration before continuing a test, such as creating a pause before ending a recording.

You can specify the `duration` to pause in milliseconds. The default `duration` is 5 seconds.

For comprehensive options, see the [wait](/docs/references/schemas/wait) reference.

## Examples

```json
{
  "description": "Wait for 5 seconds.",
  "action": "wait"
}
```

```json
{
  "description": "Wait for 500 milliseconds.",
  "action": "wait",
  "duration": 500
}
```
