---
title: runShell
layout: default
nav_order: 1
parent: Reference
---

# runShell

Perform a native shell command.

## Examples

```json
{
  "action": "runShell",
  "command": "echo",
  "args": [
    "$USER"
  ]
}
```

```json
{
  "action": "runShell",
  "command": "echo",
  "args": [
    "hello-world"
  ],
  "id": "ddec5e20-2e81-4f38-867c-92c8d9516755",
  "description": "This is a test!"
}
```
