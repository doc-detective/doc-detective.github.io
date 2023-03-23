---
title: checkLink
layout: default
nav_order: 1
parent: Reference
---

# checkLink

Check if a URL returns an acceptable status code from a GET request.

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
