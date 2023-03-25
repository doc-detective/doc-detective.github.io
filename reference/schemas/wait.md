---
title: wait
layout: default
nav_order: 1
parent: Reference
---

# wait

Pause before performing the next action.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. The action to perform. | 
duration | number |  Optional. Milliseconds to wait. | `500`

## Examples

```json
{
  "action": "wait"
}
```

```json
{
  "action": "wait",
  "duration": 5000
}
```
