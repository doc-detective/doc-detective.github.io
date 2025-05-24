
# tests-array-anyOf[0]-steps-array-anyOf[0]-allOf[1]-checkLink-anyOf[1]-bd79d536

Check if an HTTP or HTTPS URL returns an acceptable status code from a GET request.

## Referenced In

- [tests-array-anyOf[0]-steps-array-anyOf[0]-allOf[1]-6cda0b4a](/docs/references/schemas/tests-array-anyof-0--steps-array-anyof-0--allof-1--6cda0b4a)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
url | string | Required. URL to check. Can be a full URL or a path. If a path is provided, `origin` must be specified.<br/><br/>Pattern: `(^(http://|https://|/).*|\$[A-Za-z0-9_]+)` | 
origin | string | Optional. Protocol and domain to navigate to. Prepended to `url`. | 
statusCodes | one of:<br/>- integer<br/>- array of integer | Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | ``[200,301,302,307,308]``

## Examples

```json
{
  "url": "example",
  "origin": "example",
  "statusCodes": [
    200,
    301,
    302,
    307,
    308
  ]
}
```
