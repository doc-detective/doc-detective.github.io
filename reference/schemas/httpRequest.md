---
title: httpRequest
layout: default
nav_order: 1
parent: Reference
---

# httpRequest

Perform a generic HTTP request, for example to an API.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Aciton to perform. | 
url | string |  Required. URL for the HTTP request. | 
statusCodes | array |  Optional. undefined | `[200]`
method | string |  Optional. Method of the HTTP request<br><br>Accepted values: `get`, `put`, `post`, `patch`, `delete` | `get`
requestHeaders | object |  Optional. Headers to include in the HTTP request, in key/value format. | `{}`
responseHeaders | object |  Optional. Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the step fails. | `{}`
requestParams | object |  Optional. URL parameters to include in the HTTP request, in key/value format. | `{}`
responseParams | object |  Optional. URL parameters expected in the response, in key/value format. If one or more `responseParams` entries aren't present in the response, the step fails. | `{}`
requestData | object |  Optional. JSON object to include as the body of the HTTP request. | `{}`
responseData | object |  Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | `{}`
envsFromResponseData | array |  Optional. Environment variables to set based on response variables, as an object of the environment variable name and the jq filter applied to the response data to identify the variable's value. | `[]`

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
