---
title: saveScreenshot
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

# saveScreenshot
{: .no_toc}

## Description

Takes a screenshot in PNG format.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. The action to perform. | 
path | string |  Optional. File path of the PNG file, relative to `directory`. If not specified, the file name is the ID of the step. | 
directory | string |  Optional. Directory of the PNG file. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
maxVariation | number |  Optional. Allowed variation in percentage of pixels between the new screenshot and the exisitng screenshot at `path`. If the difference between the new screenshot and the existing screenshot is greater than `maxVariation`, the step fails. If a screenshot doesn't exist at `path`, this value is ignored. | `5`
overwrite | string |  Optional. If `true`, overwrites the existing screenshot at `path` if it exists.
If `byVariation`, overwrites the existing screenshot at `path` if the difference between the new screenshot and the existing screenshot is greater than `maxVariation`.<br><br>Accepted values: `true`, `false`, `byVariation` | `false`

## Examples

```json
{
  "action": "saveScreenshot"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png",
  "directory": "static/images"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png",
  "directory": "static/images",
  "maxVariation": 10,
  "overwrite": "byVariation"
}
```
