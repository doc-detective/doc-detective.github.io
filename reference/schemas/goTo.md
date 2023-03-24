---
title: goTo
layout: default
nav_order: 1
parent: Reference
---

# goTo

Navigate to a specified URL.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string | ID of the step. | undefined
description | string | Description of the step. | undefined
action | string | Action to perform. | undefined
url | string | URL to navigate to. | undefined

## Examples

```json
{
  "action": "goTo",
  "url": "https://www.google.com"
}
```

```json
{
  "id": "ddec5e20-2e81-4f38-867c-92c8d9516755",
  "description": "This is a test!",
  "action": "goTo",
  "url": "https://www.google.com"
}
```
