---
title: typeKeys
layout: default
nav_order: 1
parent: Reference
---

<details open markdown="block">
<summary>
Table of contents
</summary>
{: .text-delta }
- TOC
{:toc}
</details>

# typeKeys
{: .no_toc}

## Description

Type keys. To type special keys, begin and end the string with `$` and use the [special key's enum](). For example, to type the Escape key, enter `$ESCAPE$`.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. The action to perform. | 
keys | One of<br>-&nbsp;string<br>-&nbsp;array of strings |  Required. String of keys to enter. | 
delay | number |  Optional. Delay in milliseconds between each key press. Only valid during a recording. | `100`

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

```json
{
  "action": "typeKeys",
  "keys": [
    "kittens",
    "$ENTER$"
  ],
  "delay": 500
}
```
