
# checkLink



## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
url | string |  Optional. URL to check. Can be a full URL or a path. If a path is provided, `origin` must be specified. | 
origin | string |  Optional. Protocol and domain to navigate to. Prepended to `url`. | 
statusCodes | One of<br/>-&nbsp;integer<br/>-&nbsp;array of integer |  Optional. Accepted status codes. If the specified URL returns a code other than what is specified here, the action fails. | ``[200,301,302,307,308]``

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
