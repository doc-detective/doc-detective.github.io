# dragAndDrop

Drag and drop an element from a source location to a target location.

## Referenced In

- [Markup definition](/docs/references/schemas/markup-definition)
- [test](/docs/references/schemas/test)
- [Resolved context](/docs/references/schemas/resolved-context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
dragAndDrop | object([Drag and drop element (detailed)](/docs/references/schemas/drag-and-drop-element-detailed)) | Required. Drag and drop an element from source to target. | 

## Examples

```json
{
  "dragAndDrop": {
    "source": "Table Widget",
    "target": ".drop-zone"
  }
}
```

```json
{
  "dragAndDrop": {
    "source": {
      "selector": ".draggable-item",
      "elementText": "Chart"
    },
    "target": {
      "selector": ".drop-zone[data-zone='primary']"
    },
    "duration": 1500
  }
}
```