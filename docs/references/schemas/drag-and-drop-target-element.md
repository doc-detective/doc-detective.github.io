# Drag and drop target element

Configuration for targeting elements in drag and drop operations using selector and/or element text matching.

## Referenced In

- [Drag and drop element (detailed)](/docs/references/schemas/drag-and-drop-element-detailed)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
selector | string | Optional. CSS selector or XPath to locate the element. | 
elementText | string | Optional. Text content of the element to match. Supports regex patterns when wrapped with forward slashes (e.g., `/pattern/`). | 

## Examples

```json
{
  "selector": ".draggable-widget",
  "elementText": "Chart Widget"
}
```

```json
{
  "selector": ".drop-zone[data-zone='primary']"
}
```

```json
{
  "elementText": "/Widget.*[0-9]+/"
}
```