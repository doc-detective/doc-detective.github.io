---
title: checkLink
layout: default
nav_order: 1
parent: Reference
---

# checkLink

Check if a URL returns an acceptable status code from a GET request.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string | ID of the step. | undefined
description | string | Description of the step. | undefined
action | string | Action to perform. | undefined
url | string | URL to check. | undefined
statusCodes | array | undefined | 200

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
