
# Request



## Referenced In

- [HTTP request (detailed)](/docs/references/schemas/HTTP request (detailed))

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
headers | object([Request headers](/docs/references/schemas/Request headers)) | Optional. Headers to include in the HTTP request, in key/value format. | ``{}``
parameters | object([Request parameters](/docs/references/schemas/Request parameters)) | Optional. URL parameters to include in the HTTP request, in key/value format. | ``{}``
body | one of:<br/>- object([Request body object](/docs/references/schemas/Request body object))<br/>- array of unknown<br/>- string | Optional. JSON object to include as the body of the HTTP request. | ``{}``

## Examples

```json
{
  "headers": {},
  "parameters": {},
  "body": {}
}
```
