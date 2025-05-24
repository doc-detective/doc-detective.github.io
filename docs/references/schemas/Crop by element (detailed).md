
# Crop by element (detailed)

Crop the screenshot to a specific element.

## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[8]-allOf[1]-screenshot-anyOf[1]-34b48f9b](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-8--allof-1--screenshot-anyof-1--34b48f9b)
- [anyOf[1]-34b48f9b](/docs/references/schemas/anyof-1--34b48f9b)
- [tests-array-anyOf[0]-steps-array-anyOf[8]-allOf[1]-screenshot-anyOf[1]-34b48f9b](/docs/references/schemas/tests-array-anyof-0--steps-array-anyof-8--allof-1--screenshot-anyof-1--34b48f9b)
- [tests-array-anyOf[0]-contexts-array-steps-array-anyOf[8]-allOf[1]-screenshot-anyOf[1]-34b48f9b](/docs/references/schemas/tests-array-anyof-0--contexts-array-steps-array-anyof-8--allof-1--screenshot-anyof-1--34b48f9b)
- [anyOf[8]-allOf[1]-screenshot-anyOf[1]-34b48f9b](/docs/references/schemas/anyof-8--allof-1--screenshot-anyof-1--34b48f9b)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
elementText | string | Optional. Display text of the element to screenshot. | 
selector | string | Optional. Selector of the element to screenshot. | 
padding | one of:<br/>- number<br/>- object | Optional. No description provided. | 

## Examples

```json
{
  "elementText": "example",
  "selector": "example",
  "padding": 42
}
```
