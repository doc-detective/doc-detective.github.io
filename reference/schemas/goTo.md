---
title: goTo
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

# goTo
{: .no_toc}

## Description

Navigate to a specified URL.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Action to perform. | 
url | string |  Required. URL to navigate to. | 

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
