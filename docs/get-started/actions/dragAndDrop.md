---
sidebar_position: 4
---

# dragAndDrop

Drag and drop an element from a source location to a target location.

## Syntax

```json
{
  "dragAndDrop": "source_element"
}
```

```json
{
  "dragAndDrop": {
    "source": "source_element",
    "target": "target_element",
    "duration": 1000
  }
}
```

## Properties

| Property | Type | Description | Default |
| :-- | :-- | :-- | :-- |
| `source` | string or object | **Required.** The element to drag. Can be display text, CSS selector, XPath selector, or a detailed element object. | |
| `target` | string or object | **Required.** The target location to drop the element. Can be display text, CSS selector, XPath selector, or a detailed element object. | |
| `duration` | integer | Duration of the drag operation in milliseconds. | `1000` |

### Element specification

Both `source` and `target` can be specified as:

- **String**: Display text, CSS selector, or regex pattern (enclosed in forward slashes)
- **Object**: Detailed element specification with the following properties:

| Property | Type | Description | Default |
| :-- | :-- | :-- | :-- |
| `elementText` | string | Display text or regex pattern (enclosed in forward slashes) of the element. | |
| `selector` | string | CSS selector or XPath selector of the element. | |
| `timeout` | integer | Maximum duration in milliseconds to wait for the element to exist. | `5000` |

When using the object format, you must specify either `elementText` or `selector` (or both). If both are specified, the element must match both criteria.

## Examples

### Basic drag and drop

Drag an element with text "Table" to an element with ID "canvas":

```json
{
  "dragAndDrop": {
    "source": "Table",
    "target": "#canvas"
  }
}
```

### Drag and drop with CSS selectors

Drag a draggable block to a drop zone with custom duration:

```json
{
  "dragAndDrop": {
    "source": ".draggable-block",
    "target": ".drop-zone",
    "duration": 2000
  }
}
```

### Detailed element specification

Drag a widget with specific text to a design canvas:

```json
{
  "dragAndDrop": {
    "source": {
      "selector": ".widget",
      "elementText": "Data Table"
    },
    "target": {
      "selector": "#design-canvas"
    },
    "duration": 500
  }
}
```

### Using regex patterns

Drag any widget item to a canvas using regex patterns:

```json
{
  "dragAndDrop": {
    "source": "/Widget Item.*/",
    "target": "#canvas"
  }
}
```

### Complex element matching

Drag a button with regex text pattern to a drop zone:

```json
{
  "dragAndDrop": {
    "source": {
      "selector": ".draggable",
      "elementText": "/Button [0-9]+/"
    },
    "target": {
      "elementText": "/Drop Zone.*/"
    }
  }
}
```

## Notes

- The `dragAndDrop` action simulates mouse drag-and-drop interactions
- Both source and target elements must be visible and interactable
- The `duration` property controls how long the drag operation takes, which can be useful for animations or visual feedback
- If elements are not found within the specified timeout, the step will fail
- Regex patterns must be enclosed in forward slashes (e.g., `/pattern/`)
- The action waits for both source and target elements to exist before performing the drag operation