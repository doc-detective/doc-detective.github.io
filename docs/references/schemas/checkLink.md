
# checkLink

Check if a URL returns an acceptable status code from a GET request.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Action to perform. | 
url | string |  Required. URL to check. | 
origin | string |  Optional. Protocol and domain to navigate to. Prepended to `url`. | 
statusCodes | array of integers |  Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | ``[200,201,202]``

## Examples

```json
{
  "action": "checkLink",
  "url": "https://www.google.com"
}
```

```json
{
  "action": "checkLink",
  "url": "https://www.google.com",
  "statusCodes": [
    200
  ]
}
```

```json
{
  "action": "checkLink",
  "url": "/search",
  "origin": "www.google.com",
  "statusCodes": [
    200
  ]
}
```
