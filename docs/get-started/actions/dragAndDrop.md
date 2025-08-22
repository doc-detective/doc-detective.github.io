---
sidebar_position: 4
---

# dragAndDrop

Drag and drop an element from a source location to a target location on the page.

## Syntax

### String (simple)

```json
{
  "dragAndDrop": {
    "source": "string",
    "target": "string"
  }
}
```

### Object (detailed)

```json
{
  "dragAndDrop": {
    "source": {
      "selector": "string",
      "elementText": "string"
    },
    "target": {
      "selector": "string", 
      "elementText": "string"
    },
    "duration": "number"
  }
}
```

## Properties

| Property | Type | Description | Default |
| :-- | :-- | :-- | :-- |
| `source` | string or object | **Required.** The element to drag. Can be a string (element text or CSS selector) or an object with `selector` and/or `elementText` properties. | |
| `target` | string or object | **Required.** The element to drop onto. Can be a string (element text or CSS selector) or an object with `selector` and/or `elementText` properties. | |
| `duration` | number | Optional. Duration of the drag operation in milliseconds. | `1000` |

### Source and Target Properties

When using the detailed object format for `source` or `target`, you can specify:

| Property | Type | Description |
| :-- | :-- | :-- |
| `selector` | string | CSS selector or XPath to locate the element. |
| `elementText` | string | Text content of the element to match. Supports regex patterns when wrapped with forward slashes (e.g., `/pattern/`). |

## Examples

### Basic drag and drop

Drag a "Table" widget to a drop zone:

```json
{
  "dragAndDrop": {
    "source": "Table",
    "target": ".drop-zone"
  }
}
```

### Using CSS selectors

Drag an element by selector to another element by selector:

```json
{
  "dragAndDrop": {
    "source": ".draggable-item[data-widget='chart']",
    "target": "#canvas-area",
    "duration": 1500
  }
}
```

### Detailed syntax with element text and selector

Combine selector and text matching for precise element targeting:

```json
{
  "dragAndDrop": {
    "source": {
      "selector": ".widget-item",
      "elementText": "Chart Widget"
    },
    "target": {
      "selector": ".drop-zone[data-zone='primary']"
    },
    "duration": 2000
  }
}
```

### Using regex patterns

Use regex patterns to match element text dynamically:

```json
{
  "dragAndDrop": {
    "source": "/Widget Item.*/",
    "target": ".drop-zone"
  }
}
```

```json
{
  "dragAndDrop": {
    "source": {
      "selector": ".draggable",
      "elementText": "/Widget.*[0-9]+/"
    },
    "target": {
      "selector": ".drop-zone"
    }
  }
}
```

## How it works

The `dragAndDrop` action locates the source and target elements using the specified criteria, then performs a drag and drop operation between them. The action:

1. **Finds the source element** using the provided selector, element text, or combination of both
2. **Finds the target element** using the provided selector, element text, or combination of both  
3. **Performs the drag and drop** using WebDriver's native drag and drop functionality
4. **Falls back to HTML5 simulation** if the native method fails silently

### Element matching

Elements can be matched using:

- **Element text**: Matches elements by their visible text content
- **CSS selectors**: Standard CSS selector syntax (e.g., `.class`, `#id`, `[attribute="value"]`)
- **XPath selectors**: XPath expressions for complex element targeting
- **Regex patterns**: Regular expressions for flexible text matching (wrap with `/pattern/`)
- **Combined matching**: Use both selector and elementText for precise targeting

### Drag and drop implementation

The action uses a robust approach with multiple fallback mechanisms:

1. **WebDriver native method**: Uses the browser's built-in drag and drop functionality
2. **HTML5 simulation**: If the native method fails, falls back to JavaScript-based HTML5 drag and drop events
3. **Error handling**: Provides detailed error messages for troubleshooting

## Notes

- The `dragAndDrop` action requires a browser context and cannot be used with API-only testing
- Some web applications may require specific drag and drop implementations - the action includes fallbacks to handle different scenarios
- When using regex patterns in `elementText`, wrap the pattern with forward slashes (e.g., `/pattern/`)
- The `duration` parameter controls how long the drag operation takes, which can be useful for applications that require slower drag movements
- Both source and target elements must be visible and interactable on the page

## Related actions

- [**click**](/docs/get-started/actions/click): Click or tap an element
- [**find**](/docs/get-started/actions/find): Locate and interact with an element
- [**type**](/docs/get-started/actions/type): Type text into an element