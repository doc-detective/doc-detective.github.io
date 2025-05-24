
# Click element (detailed)



## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[1]-allOf[1]-13cd754d](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-1--allof-1--13cd754d)
- [Find element (detailed)](/docs/references/schemas/Find element (detailed))
- [tests-array-anyOf[0]-steps-array-anyOf[1]-allOf[1]-13cd754d](/docs/references/schemas/tests-array-anyof-0--steps-array-anyof-1--allof-1--13cd754d)
- [tests-array-anyOf[0]-contexts-array-steps-array-anyOf[1]-allOf[1]-13cd754d](/docs/references/schemas/tests-array-anyof-0--contexts-array-steps-array-anyof-1--allof-1--13cd754d)
- [anyOf[1]-allOf[1]-13cd754d](/docs/references/schemas/anyof-1--allof-1--13cd754d)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
button | string | Optional. Kind of click to perform.<br/><br/>Accepted values: `left`, `right`, `middle` | 
elementText | string | Optional. Display text of the element to click. If combined with `selector`, the element must match both the text and the selector. | 
selector | string | Optional. Selector of the element to click. If combined with `elementText`, the element must match both the text and the selector. | 

## Examples

```json
{
  "button": "left",
  "elementText": "example",
  "selector": "example"
}
```
