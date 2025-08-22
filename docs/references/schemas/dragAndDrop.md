# dragAndDrop



## Referenced In

- [Markup definition](/docs/references/schemas/markup-definition)
- [test](/docs/references/schemas/test)
- [Resolved context](/docs/references/schemas/resolved-context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
dragAndDrop | object([Drag and drop (detailed)](/docs/references/schemas/drag-and-drop-detailed)) | Required. Drag an element from a source location to a target location. | 

## Examples

```json
{
  "dragAndDrop": {
    "source": "Draggable Item",
    "target": "Drop Zone"
  }
}
```