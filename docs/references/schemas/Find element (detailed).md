
# Find element (detailed)



## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[2]-allOf[1]-62bebdf2](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-2--allof-1--62bebdf2)
- [tests-array-anyOf[0]-steps-array-anyOf[2]-allOf[1]-62bebdf2](/docs/references/schemas/tests-array-anyof-0--steps-array-anyof-2--allof-1--62bebdf2)
- [tests-array-anyOf[0]-contexts-array-steps-array-anyOf[2]-allOf[1]-62bebdf2](/docs/references/schemas/tests-array-anyof-0--contexts-array-steps-array-anyof-2--allof-1--62bebdf2)
- [anyOf[2]-allOf[1]-62bebdf2](/docs/references/schemas/anyof-2--allof-1--62bebdf2)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
elementText | string | Optional. Display text of the element to find. If combined with `selector`, the element must match both the text and the selector. | 
selector | string | Optional. Selector of the element to find. If combined with `elementText`, the element must match both the text and the selector. | 
timeout | integer | Optional. Max duration in milliseconds to wait for the element to exist. | `5000`
moveTo | boolean | Optional. Move to the element. If the element isn't visible, it's scrolled into view. | `true`
click | one of:<br/>- one of:<br/>- string<br/>- object([Click element (detailed)](/docs/references/schemas/Click element (detailed)))<br/>- boolean<br/>- object | Optional. Click the element. | 
type | unknown | Optional. Type keys after finding the element. Either a string or an object with a `keys` field as defined in [`type`](type). To type in the element, make the element active with the `click` parameter. | 

## Examples

```json
{
  "elementText": "example",
  "selector": "example",
  "timeout": 5000,
  "moveTo": true
}
```
