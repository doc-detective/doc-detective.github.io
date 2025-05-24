
# openApi

OpenAPI description and configuration.

## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[4]-allOf[1]-httpRequest-anyOf[1]-df5c29fa](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-4--allof-1--httprequest-anyof-1--df5c29fa)
- [integrations-9b4f8873](/docs/references/schemas/integrations-9b4f8873)
- [anyOf[1]-df5c29fa](/docs/references/schemas/anyof-1--df5c29fa)
- [specification](/docs/references/schemas/specification)
- [test](/docs/references/schemas/test)
- [tests-array-anyOf[0]-steps-array-anyOf[4]-allOf[1]-httpRequest-anyOf[1]-df5c29fa](/docs/references/schemas/tests-array-anyof-0--steps-array-anyof-4--allof-1--httprequest-anyof-1--df5c29fa)
- [tests-array-anyOf[0]-contexts-array-9bc6aaa2](/docs/references/schemas/tests-array-anyof-0--contexts-array-9bc6aaa2)
- [tests-array-anyOf[0]-contexts-array-steps-array-anyOf[4]-allOf[1]-httpRequest-anyOf[1]-df5c29fa](/docs/references/schemas/tests-array-anyof-0--contexts-array-steps-array-anyof-4--allof-1--httprequest-anyof-1--df5c29fa)
- [anyOf[4]-allOf[1]-httpRequest-anyOf[1]-df5c29fa](/docs/references/schemas/anyof-4--allof-1--httprequest-anyof-1--df5c29fa)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
name | string | Optional. Name of the OpenAPI description, as defined in your configuration. | 
descriptionPath | string | Optional. URL or local path to the OpenAPI description. | 
definition | object | ReadOnly. OpenAPI definition object loaded from the `descriptionPath`. This is a resolved version of the OpenAPI description and should not be user-defined. | 
operationId | string | Optional. ID of the operation to use for the request. | 
server | string | Optional. Server to use for example requests. Only valid if `useExample` is `request` or `both`. If not specified but an example is used for the request, uses the first server defined in the OpenAPI description. | 
validateAgainstSchema | string | Optional. Validates the request and/or response against the schema in the OpenAPI description. If the request or response doesn't match the schema, the step fails.<br/><br/>Accepted values: `request`, `response`, `both`, `none` | `both`
mockResponse | boolean | Optional. If `true`, doesn't make the HTTP request, but instead uses the response example or schema from the OpenAPI description as the response data. Useful for creating tests when an API isn't fully implemented yet. If `statusCode` isn't specified, uses the first defined response code. | 
statusCode | integer | Optional. Response code to use for validation, examples, and status code checking. If the response code doesn't match, the step fails. `statusCodes` overrides this value when specified. | 
useExample | string | Optional. Uses the example from the OpenAPI description as the request and response data. If the request or response has multiple examples, specify `exampleKey`. If `statusCode` isn't specified, uses the first defined response code. `requestData`, `requestParams`, and `requestHeaders` override portions of request examples when specified. `responseData` overrides portions of response examples when specified.<br/><br/>Accepted values: `request`, `response`, `both`, `none` | `none`
exampleKey | string | Optional. Key of the example to use from the `examples` property in the OpenAPI description. If an `examples` key isn't specified or isn't available for a given parameter or object, the `example` property value is used. | ``
headers | object | Optional. Request headers to add to requests. For example, to set `Authorization` headers for all requests from the specified OpenAPI document. If specified in both a config and a step, the step value overrides the config value. | 

## Examples

```json
{
  "descriptionPath": "https://petstore.swagger.io/v2/swagger.json"
}
```

```json
{
  "name": "Reqres",
  "operationId": "getUserById"
}
```

```json
{
  "descriptionPath": "https://api.example.com/openapi.json",
  "operationId": "getUserById"
}
```

```json
{
  "descriptionPath": "https://api.example.com/openapi.json",
  "operationId": "createUser",
  "useExample": "both"
}
```

```json
{
  "descriptionPath": "https://api.example.com/openapi.json",
  "operationId": "createUser",
  "useExample": "both",
  "exampleKey": "example1"
}
```

```json
{
  "descriptionPath": "https://api.example.com/openapi.json",
  "operationId": "createUser",
  "useExample": "both",
  "exampleKey": "example1",
  "statusCode": 201
}
```

```json
{
  "descriptionPath": "https://api.example.com/openapi.json",
  "operationId": "createUser",
  "useExample": "both",
  "exampleKey": "example1",
  "statusCode": 201,
  "validateAgainstSchema": "none"
}
```

```json
{
  "descriptionPath": "https://api.example.com/openapi.json",
  "operationId": "createUser",
  "useExample": "both",
  "exampleKey": "example1",
  "statusCode": 201,
  "validateAgainstSchema": "none",
  "mockResponse": true
}
```

```json
{
  "descriptionPath": "https://api.example.com/openapi.json",
  "operationId": "createUser",
  "useExample": "both",
  "exampleKey": "example1",
  "statusCode": 201,
  "validateAgainstSchema": "none",
  "mockResponse": true,
  "headers": {
    "Authorization": "Bearer 12345"
  }
}
```
