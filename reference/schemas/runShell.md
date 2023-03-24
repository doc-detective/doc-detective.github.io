---
title: runShell
layout: default
nav_order: 1
parent: Reference
---

# runShell

Perform a native shell command.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string | ID of the step. | Generated UUID
description | string | Description of the step. | 
action | string | undefined | 
command | string | Command to perform in the machine's default shell. | 
args | array | Arguments for the command. | `[]`

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
