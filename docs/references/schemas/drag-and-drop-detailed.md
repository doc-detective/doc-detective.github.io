# Drag and drop (detailed)

Drag and drop an element from source to target.

## Referenced In

- [dragAndDrop](/docs/references/schemas/dragAndDrop)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
source | string or object([Element specification](/docs/references/schemas/element-specification)) | Required. The element to drag. Can be display text, selector, or regex pattern (enclosed in forward slashes) of the element. | 
target | string or object([Element specification](/docs/references/schemas/element-specification)) | Required. The target location to drop the element. Can be display text, selector, or regex pattern (enclosed in forward slashes) of the element. | 
duration | integer | Duration of the drag operation in milliseconds. | `1000`

## Examples

```json
{
  "source": "Table",
  "target": "#canvas"
}
```

```json
{
  "source": ".draggable-block",
  "target": ".drop-zone",
  "duration": 2000
}
```

```json
{
  "source": {
    "selector": ".widget",
    "elementText": "Data Table"
  },
  "target": {
    "selector": "#design-canvas"
  },
  "duration": 500
}
```