---
title: saveScreenshot
layout: default
nav_order: 1
parent: Reference
---

# saveScreenshot

Takes a screenshot in PNG format.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string | ID of the step. | Generated UUID
description | string | Description of the step. | 
action | string | The action to perform. | 
path | string | File path of the PNG file. If not specified, the file path is your media directory and the file name is the ID of the step. | 

## Examples

```json
{
  "action": "saveScreenshot"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png"
}
```
