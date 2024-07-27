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
statusCodes | array of integers |  Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | `[200]`
method | string |  Optional. Method of the HTTP request<br/><br/>Accepted values: `get`, `put`, `post`, `patch`, `delete` | `get`
timeout | integer |  Optional. Timeout for the HTTP request, in milliseconds. | `60000`
requestHeaders | object |  Optional. Headers to include in the HTTP request, in key/value format. | `{}`
responseHeaders | object |  Optional. Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the step fails. | `{}`
requestParams | object |  Optional. URL parameters to include in the HTTP request, in key/value format. | `{}`
responseParams | object |  Optional. DEPRECATED. | `{}`
requestData | object |  Optional. JSON object to include as the body of the HTTP request. | `{}`
responseData | object |  Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | `{}`
allowAdditionalFields | boolean |  Optional. If `false`, the step fails when the response data contains fields not specified in `responseData`. | `true`
savePath | string |  Optional. File path to save the command's output, relative to `saveDirectory`. Specify a file extension that matches the expected response type, such as `.json` for JSON content or `.txt` for strings. | 
saveDirectory | string |  Optional. Directory to save the command's output. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
maxVariation | integer |  Optional. Allowed variation in percentage of text different between the current output and previously saved output. If the difference between the current output and the previous output is greater than `maxVariation`, the step fails. If output doesn't exist at `savePath`, this value is ignored. | `0`
overwrite | string |  Optional. If `true`, overwrites the existing output at `savePath` if it exists.
If `byVariation`, overwrites the existing output at `savePath` if the difference between the new output and the existing output is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `byVariation` | `false`
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
  "timeout": 30000,
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
  ],
  "savePath": "response.json",
  "saveDirectory": "media",
  "maxVariation": 5,
  "overwrite": "byVariation"
}
```
