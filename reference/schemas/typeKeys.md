---
title: typeKeys
layout: default
nav_order: 1
parent: Reference
---

# typeKeys

Type keys. To type special keys, begin and end the string with `$` and use the [special key's enum](). For example, to type the Escape key, enter `$ESCAPE$`.

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
