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
id | string | ID of the step. | undefined
description | string | Description of the step. | undefined
action | string | The action to perform. | undefined
keys | undefined | String of keys to enter. | undefined

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
