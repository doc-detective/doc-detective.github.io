
# httpRequest

Perform a generic HTTP request, for example to an API.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
url | string |  Optional. URL for the HTTP request. | 
openApi | unknown |  Optional. No description provided. | 
statusCodes | array of integer |  Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | ``[200,201]``
method | string |  Optional. Method of the HTTP request<br/><br/>Accepted values: `get`, `put`, `post`, `patch`, `delete` | `get`
timeout | integer |  Optional. Timeout for the HTTP request, in milliseconds. | `60000`
request | object |  Optional. No description provided. | 
request.headers | object |  Optional. Headers to include in the HTTP request, in key/value format. | ``{}``
request.parameters | object |  Optional. URL parameters to include in the HTTP request, in key/value format. | ``{}``
request.body | One of<br/>-&nbsp;object<br/>-&nbsp;array of unknown<br/>-&nbsp;string |  Optional. JSON object to include as the body of the HTTP request. | ``{}``
response | object |  Optional. No description provided. | 
response.headers | object |  Optional. Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the step fails. | ``{}``
response.body | One of<br/>-&nbsp;object<br/>-&nbsp;array of unknown<br/>-&nbsp;string |  Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | ``{}``
allowAdditionalFields | boolean |  Optional. If `false`, the step fails when the response data contains fields not specified in the response body. | `true`
path | string |  Optional. File path to save the command's output, relative to `directory`. Specify a file extension that matches the expected response type, such as `.json` for JSON content or `.txt` for strings. | 
directory | string |  Optional. Directory to save the command's output. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
maxVariation | number |  Optional. Allowed variation in percentage of text different between the current output and previously saved output. If the difference between the current output and the previous output is greater than `maxVariation`, the step fails. If output doesn't exist at `path`, this value is ignored. | `0`
overwrite | string |  Optional. If `true`, overwrites the existing output at `path` if it exists.
If `aboveVariation`, overwrites the existing output at `path` if the difference between the new output and the existing output is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`

## Examples

```json
"https://reqres.in/api/users"
```

```json
{
  "url": "https://reqres.in/api/users"
}
```

```json
{
  "url": "https://reqres.in/api/users/2",
  "method": "put",
  "request": {
    "body": {
      "name": "morpheus",
      "job": "zion resident"
    }
  }
}
```

```json
{
  "url": "https://reqres.in/api/users",
  "method": "post",
  "request": {
    "body": {
      "name": "morpheus",
      "job": "leader"
    }
  },
  "response": {
    "body": {
      "name": "morpheus",
      "job": "leader"
    }
  },
  "statusCodes": [
    200,
    201
  ]
}
```

```json
{
  "url": "https://www.api-server.com",
  "method": "post",
  "timeout": 30000,
  "request": {
    "body": {
      "field": "value"
    },
    "headers": {
      "header": "value"
    },
    "parameters": {
      "param": "value"
    }
  },
  "response": {
    "body": {
      "field": "value"
    },
    "headers": {
      "header": "value"
    }
  },
  "statusCodes": [
    200
  ]
}
```

```json
{
  "url": "https://reqres.in/api/users",
  "method": "post",
  "request": {
    "body": {
      "name": "morpheus",
      "job": "leader"
    }
  },
  "response": {
    "body": {
      "name": "morpheus",
      "job": "leader"
    }
  },
  "statusCodes": [
    200,
    201
  ],
  "path": "response.json",
  "directory": "media",
  "maxVariation": 0.05,
  "overwrite": "aboveVariation"
}
```

```json
{
  "openApi": "getUserById"
}
```

```json
{
  "openApi": {
    "name": "Reqres",
    "operationId": "getUserById"
  },
  "request": {
    "parameters": {
      "id": 123
    }
  }
}
```

```json
{
  "openApi": {
    "descriptionPath": "https://api.example.com/openapi.json",
    "operationId": "getUserById"
  },
  "request": {
    "parameters": {
      "id": 123
    }
  }
}
```

```json
{
  "openApi": {
    "descriptionPath": "https://api.example.com/openapi.json",
    "operationId": "createUser",
    "useExample": "both"
  }
}
```

```json
{
  "openApi": {
    "descriptionPath": "https://api.example.com/openapi.json",
    "operationId": "updateUser",
    "useExample": "request",
    "exampleKey": "acme"
  }
}
```

```json
{
  "openApi": {
    "descriptionPath": "https://api.example.com/openapi.json",
    "operationId": "updateUser",
    "useExample": "request",
    "exampleKey": "acme",
    "headers": {
      "Authorization": "Bearer $TOKEN"
    }
  }
}
```
