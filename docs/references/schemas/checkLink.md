
# checkLink



## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
checkLink | string | Check if an HTTP or HTTPS URL returns an acceptable status code from a GET request. | 
url | string | Required. URL to check. Can be a full URL or a path. If a path is provided, `origin` must be specified.<br/><br/>Pattern: `(^(http://|https://|/).*|\$[A-Za-z0-9_]+)` | 
origin | string | Optional. Protocol and domain to navigate to. Prepended to `url`. | 
statusCodes | integer | Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | 
statusCodes | array of integer | Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | 

## Examples

```json
"https://www.google.com"
```

```json
"/search"
```

```json
{
  "url": "https://www.google.com",
  "statusCodes": 200
}
```

```json
{
  "url": "/search",
  "origin": "www.google.com",
  "statusCodes": [
    200
  ]
}
```
