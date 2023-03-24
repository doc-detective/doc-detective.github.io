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
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Action to perform. | 
selector | string |  Required. Selector that uniquely identifies the element. | 
timeout | integer |  Optional. Max duration in milliseconds to wait for the element to exist. | `500`
matchText | string |  Optional. Text that the element shuold contain. If the element doesn't contain the text, the step fails. | 
moveTo | boolean |  Optional. Move to the element. If the element isn't visible, it's scrolled into view. Only runs the if the test is being recorded. | 
click | boolean |  Optional. Click the element. | 
typeKeys | undefined |  Optional. Type keys after finding the element. If you want to type in the element, make the element active with the `click` parameter. | 

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
