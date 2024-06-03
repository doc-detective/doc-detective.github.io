---
title: httpRequest
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

# httpRequest
{: .no_toc}

## Description

Perform a generic HTTP request, for example to an API.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Action to perform. | 
action | string |  Required. Action to perform. | 
url | string |  Required. URL for the HTTP request. | 
statusCodes | array of integers |  Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | `[200]`
method | string |  Optional. Method of the HTTP request<br><br>Accepted values: `get`, `put`, `post`, `patch`, `delete` | `get`
requestHeaders | object |  Optional. Headers to include in the HTTP request, in key/value format. | `{}`
responseHeaders | object |  Optional. Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the step fails. | `{}`
requestParams | object |  Optional. URL parameters to include in the HTTP request, in key/value format. | `{}`
responseParams | object |  Deprecated.  | `{}`
requestData | object |  Optional. JSON object to include as the body of the HTTP request. | `{}`
responseData | object |  Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | `{}`
envsFromResponseData | array of objects |  Optional. Environment variables to set based on response variables, as an object of the environment variable name and the jq filter applied to the response data to identify the variable's value. | `[]`
envsFromResponseData.name | string |  Required. Name of the environment variable to set. | 
envsFromResponseData.jqFilter | string |  Required. jq filter to apply to the response data. If the filter doesn't return a value, the environment variable isn't set. | 

## Examples

```json
{
  "action": "httpRequest",
  "url": "https://reqres.in/api/users"
}
```

```json
{
  "action": "httpRequest",
  "url": "https://reqres.in/api/users/2",
  "method": "put",
  "requestData": {
    "name": "morpheus",
    "job": "zion resident"
  }
}
```

```json
{
  "action": "httpRequest",
  "url": "https://reqres.in/api/users",
  "method": "post",
  "requestData": {
    "name": "morpheus",
    "job": "leader"
  },
  "responseData": {
    "name": "morpheus",
    "job": "leader"
  },
  "statusCodes": [
    200,
    201
  ]
}
```

```json
{
  "action": "httpRequest",
  "url": "https://www.api-server.com",
  "method": "post",
  "requestHeaders": {
    "header": "value"
  },
  "requestParams": {
    "param": "value"
  },
  "requestData": {
    "field": "value"
  },
  "responseHeaders": {
    "header": "value"
  },
  "responseData": {
    "field": "value"
  },
  "statusCodes": [
    200
  ]
}
```
