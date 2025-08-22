# Drag and drop element (detailed)

Detailed configuration for drag and drop operations between source and target elements.

## Referenced In

- [dragAndDrop](/docs/references/schemas/dragAndDrop)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
source | string or object([Drag and drop target element](/docs/references/schemas/drag-and-drop-target-element)) | Required. The element to drag. Can be element text, CSS selector, or detailed object with selector and elementText properties. | 
target | string or object([Drag and drop target element](/docs/references/schemas/drag-and-drop-target-element)) | Required. The element to drop onto. Can be element text, CSS selector, or detailed object with selector and elementText properties. | 
duration | number | Optional. Duration of the drag operation in milliseconds. | 1000

## Examples

```json
{
  "source": "Table Widget",
  "target": ".drop-zone"
}
```

```json
{
  "source": {
    "selector": ".draggable-item",
    "elementText": "Chart Widget"
  },
  "target": {
    "selector": ".drop-zone[data-zone='primary']"
  },
  "duration": 2000
}
```

```json
{
  "source": "/Widget Item.*/",
  "target": "/Drop Zone.*/"
}
```