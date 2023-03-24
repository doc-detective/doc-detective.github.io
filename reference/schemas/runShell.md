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
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. undefined | 
command | string |  Required. Command to perform in the machine's default shell. | 
args | array |  Optional. Arguments for the command. | `[]`

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
