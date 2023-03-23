---
title: httpRequest
layout: default
nav_order: 1
parent: Reference
---

# httpRequest

Perform a generic HTTP request, for example to an API.

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
