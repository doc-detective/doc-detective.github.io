
# goTo



## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
goTo | string | Navigate to an HTTP or HTTPS URL. Can be a full URL or a path. If a path is provided, navigates relative to the current URL, if any. | 
url | string | Required. URL to navigate to. Can be a full URL or a path. If a path is provided and `origin` is specified, prepends `origin` to `url`. If a path is provided but `origin` isn't specified, attempts to navigate relative to the current URL, if any.<br/><br/>Pattern: `(^(http://|https://|/).*|\$[A-Za-z0-9_]+)` | 
origin | string | Optional. Protocol and domain to navigate to. Prepended to `url`. | 

## Examples

```json
"https://www.google.com"
```

```json
"/search"
```

```json
{
  "url": "https://www.google.com"
}
```

```json
{
  "url": "/search",
  "origin": "www.google.com"
}
```
