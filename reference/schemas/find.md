---
title: find
layout: default
nav_order: 1
parent: Reference
---

# find

Check if an element exists with the specified CSS selector.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string | ID of the step. | undefined
description | string | Description of the step. | undefined
action | string | Action to perform. | undefined
selector | string | Selector that uniquely identifies the element. | undefined
timeout | integer | Max duration in milliseconds to wait for the element to exist. | 500
matchText | string | Text that the element shuold contain. If the element doesn't contain the text, the step fails. | undefined
moveTo | boolean | Move to the element. If the element isn't visible, it's scrolled into view. Only runs the if the test is being recorded. | undefined
click | boolean | Click the element. | undefined
typeKeys | undefined | Type keys after finding the element. If you want to type in the element, make the element active with the `click` parameter. | undefined

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
