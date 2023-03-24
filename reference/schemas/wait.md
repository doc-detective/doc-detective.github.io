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
id | string | ID of the step. | 
description | string | Description of the step. | 
action | string | The action to perform. | 
duration | number | Milliseconds to wait. | `500`

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
