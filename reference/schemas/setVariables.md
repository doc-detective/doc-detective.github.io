---
title: setVariables
layout: default
nav_order: 1
parent: Reference
---

# setVariables

Load environment variables from a `.env` file.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string | ID of the step. | undefined
description | string | Description of the step. | undefined
action | string | Action to perform. | undefined
path | string | Path to the `.env` file. | undefined

## Examples

```json
{
  "action": "setVariables",
  "path": ".env"
}
```
