
# fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[3]-allOf[1]-goTo-anyOf[1]-a712d105

Navigate to an HTTP or HTTPS URL.

## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[3]-allOf[1]-64542a3e](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-3--allof-1--64542a3e)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
url | string | Required. URL to navigate to. Can be a full URL or a path. If a path is provided and `origin` is specified, prepends `origin` to `url`. If a path is provided but `origin` isn't specified, attempts to navigate relative to the current URL, if any.<br/><br/>Pattern: `(^(http://|https://|/).*|\$[A-Za-z0-9_]+)` | 
origin | string | Optional. Protocol and domain to navigate to. Prepended to `url`. | 

## Examples

```json
{
  "url": "example",
  "origin": "example"
}
```
