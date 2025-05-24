
# fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[4]-allOf[1]-httpRequest-anyOf[1]-response-88f3a73a



## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[4]-allOf[1]-httpRequest-anyOf[1]-df5c29fa](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-4--allof-1--httprequest-anyof-1--df5c29fa)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
headers | object | Optional. Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the step fails. | ``{}``
body | one of:<br/>- object<br/>- array of unknown<br/>- string | Optional. JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails. | ``{}``

## Examples

```json
{
  "headers": {},
  "body": {}
}
```
