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
path | string |  Optional. Relative file path of the PNG file from `directory`. If not specified, the file name is the ID of the step. | 
directory | string |  Optional. Directory of the PNG file. Attempts to creatr the directory if it doesn't exist. If not specified, the directory is your media directory. | 

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
