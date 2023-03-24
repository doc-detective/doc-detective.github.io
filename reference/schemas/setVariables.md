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
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Action to perform. | 
path | string |  Required. Path to the `.env` file. | 

## Examples

```json
{
  "action": "setVariables",
  "path": ".env"
}
```
