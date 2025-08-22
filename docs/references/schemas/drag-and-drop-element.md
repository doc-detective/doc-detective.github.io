# Drag and drop element



## Referenced In

- [Drag and drop (detailed)](/docs/references/schemas/drag-and-drop-detailed)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
elementText | string | Optional. Display text of the element. If combined with `selector`, the element must match both the text and the selector. | 
selector | string | Optional. CSS or XPath selector of the element. If combined with `elementText`, the element must match both the text and the selector. | 
timeout | number | Optional. Maximum duration in milliseconds to wait for this element to exist. | 

## Examples

```json
{
  "elementText": "Drag me",
  "selector": ".draggable-item"
}
```

```json
{
  "selector": "#source-element",
  "timeout": 3000
}
```