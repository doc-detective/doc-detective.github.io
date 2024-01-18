---
title: find
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

# find
{: .no_toc}

## Description

Check if an element exists with the specified CSS selector.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Action to perform. | 
selector | string |  Required. Selector that uniquely identifies the element. | 
timeout | integer |  Optional. Max duration in milliseconds to wait for the element to exist. | `5000`
matchText | string |  Optional. Text that the element should contain. If the element doesn't contain the text, the step fails. | 
moveTo | One of<br>-&nbsp;boolean<br>-&nbsp;object |  Optional. Move to the element. If the element isn't visible, it's scrolled into view. Only runs the if the test is being recorded. | `false`
click | boolean |  Optional. Click the element. | `false`
typeKeys | One of<br>-&nbsp;string<br>-&nbsp;object |  Optional. Type keys after finding the element. Either a string or an object with a `keys` field as defined in [`typeKeys`](/reference/schemas/typeKeys).<br><br>To type in the element, make the element active with the `click` parameter. | 

## Examples

```json
{
  "action": "find",
  "selector": "[title=Search]"
}
```

```json
{
  "action": "find",
  "selector": "[title=Search]",
  "timeout": 10000,
  "matchText": "Search",
  "moveTo": true,
  "click": true,
  "typeKeys": "shorthair cat"
}
```

```json
{
  "action": "find",
  "selector": "[title=Search]",
  "timeout": 10000,
  "matchText": "Search",
  "moveTo": true,
  "click": true,
  "typeKeys": {
    "keys": [
      "shorthair cat"
    ],
    "delay": 100
  }
}
```

```json
{
  "action": "find",
  "selector": "[title=Search]",
  "timeout": 10000,
  "matchText": "Search",
  "moveTo": {
    "alignment": "top",
    "offset": {
      "x": -1,
      "y": 1
    },
    "duration": 1000
  },
  "click": true,
  "typeKeys": {
    "keys": [
      "shorthair cat"
    ],
    "delay": 100
  }
}
```
