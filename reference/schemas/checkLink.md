---
title: checkLink
layout: default
nav_order: 1
parent: Reference
---

# checkLink

Check if a URL returns an acceptable status code from a GET request.

## Fields

Field | Type | Description
:-- | :-- | :--
id | string | ID of the step.
description | string | Description of the step.
action | string | Action to perform.
url | string | URL to check.
statusCodes | array | undefined

## Examples

```json
{
  "action": "checkLink",
  "url": "https://www.google.com"
}
```

```json
{
  "action": "checkLink",
  "url": "https://www.google.com",
  "statusCodes": [
    200
  ]
}
```
