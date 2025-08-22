# dragAndDrop

Drag and drop an element from source to target.

## Referenced In

- [Markup definition](/docs/references/schemas/markup-definition)
- [test](/docs/references/schemas/test)
- [Resolved context](/docs/references/schemas/resolved-context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
dragAndDrop | object([Drag and drop (detailed)](/docs/references/schemas/drag-and-drop-detailed)) | Required. Drag and drop an element from source to target. | 

## Examples

```json
{
  "dragAndDrop": {
    "source": "Table",
    "target": "#canvas"
  }
}
```

```json
{
  "dragAndDrop": {
    "source": ".draggable-block",
    "target": ".drop-zone",
    "duration": 2000
  }
}
```