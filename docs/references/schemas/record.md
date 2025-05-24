
# record



## Referenced In

- [Markup definition](/docs/references/schemas/Markup%20definition)
- [test](/docs/references/schemas/test)
- [Resolved context](/docs/references/schemas/Resolved%20context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
record | one of:<br/>- string<br/>- object([Record (detailed)](/docs/references/schemas/Record%20(detailed)))<br/>- boolean | Required. Start recording the current browser viewport. Must be followed by a `stopRecord` step. Only runs in Chrome browsers when they are visible. Supported extensions: [ '.mp4', '.webm', '.gif' ] | 

## Examples

```json
{
  "record": "example"
}
```
