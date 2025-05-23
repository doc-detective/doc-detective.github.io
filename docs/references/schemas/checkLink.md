
# checkLink



## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
url | string | Required. URL to check. Can be a full URL or a path. If a path is provided, `origin` must be specified. | 
origin | string | Optional. Protocol and domain to navigate to. Prepended to `url`. | 
statusCodes | integer | Optional. No description provided. | 
statusCodes | array of integer | Optional. No description provided. | 

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
