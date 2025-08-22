# Drag and drop (detailed)



## Referenced In

- [dragAndDrop](/docs/references/schemas/dragAndDrop)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
source | one of:<br/>- string<br/>- object([Drag and drop element](/docs/references/schemas/drag-and-drop-element)) | Required. The element to drag from. Can be element text, a selector, or a detailed element object. | 
target | one of:<br/>- string<br/>- object([Drag and drop element](/docs/references/schemas/drag-and-drop-element)) | Required. The element to drop onto. Can be element text, a selector, or a detailed element object. | 
timeout | number | Optional. Maximum duration in milliseconds to wait for the drag-and-drop operation to complete. | 

## Examples

```json
{
  "source": "Item to drag",
  "target": "#drop-target"
}
```

```json
{
  "source": {
    "selector": ".draggable",
    "elementText": "Drag me"
  },
  "target": {
    "selector": ".drop-zone",
    "timeout": 5000
  },
  "timeout": 10000
}
```