---
title: typeKeys
layout: default
nav_order: 1
parent: Reference
---

# typeKeys

Type keys. To type special keys, begin and end the string with `$` and use the [special key's enum](). For example, to type the Escape key, enter `$ESCAPE$`.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string | ID of the step. | 
description | string | Description of the step. | 
action | string | The action to perform. | 
keys | undefined | String of keys to enter. | 

## Examples

```json
{
  "action": "typeKeys",
  "keys": "kittens"
}
```

```json
{
  "action": "typeKeys",
  "keys": [
    "$ENTER$"
  ]
}
```
