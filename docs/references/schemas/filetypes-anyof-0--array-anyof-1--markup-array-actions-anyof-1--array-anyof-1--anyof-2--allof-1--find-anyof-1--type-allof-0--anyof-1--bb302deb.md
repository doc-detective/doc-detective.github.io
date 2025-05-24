
# fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[2]-allOf[1]-find-anyOf[1]-type-allOf[0]-anyOf[1]-bb302deb



## Referenced In

- [Find element (detailed)](/docs/references/schemas/Find element (detailed))

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
keys | one of:<br/>- string<br/>- array of string | Required. Sequence of keys to enter. | 
inputDelay | number | Optional. Delay in milliseconds between each key press during a recording | `100`
selector | string | Optional. Selector for the element to type into. If not specified, the typing occurs in the active element. | 

## Examples

```json
{
  "keys": "example",
  "inputDelay": 100,
  "selector": "example"
}
```
