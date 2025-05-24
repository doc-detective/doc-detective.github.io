
# fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[7]-allOf[1]-type-anyOf[1]-bb302deb



## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[7]-allOf[1]-44472a23](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-7--allof-1--44472a23)

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
