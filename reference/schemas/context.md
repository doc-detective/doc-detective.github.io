---
title: context
layout: default
nav_order: 1
parent: Reference
---

# context

An application and supported platforms.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
app | object | The application to run. | undefined
platforms | array | Supported platforms for the application. | undefined

## Examples

```json
{
  "app": {
    "name": "firefox"
  },
  "platforms": [
    "linux"
  ]
}
```

```json
{
  "app": {
    "name": "chrome"
  },
  "platforms": [
    "linux",
    "windows",
    "mac"
  ]
}
```

```json
{
  "app": {
    "name": "firefox",
    "path": "/usr/bin/firefox"
  },
  "platforms": [
    "linux"
  ]
}
```
