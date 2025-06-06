---
title: click
layout: default
nav_order: 2
parent: Actions
grand_parent: Tests
description: Click or tap an element on the page.
---

# click

The `click` action allows you to click or tap an element on the page. You can specify which mouse button to use and target elements using text or selectors.

The `click` action works in several ways:

- **String Shorthand:** The display text or selector of the element to find and click.
- **Object Format:** Use an object with detailed properties for more control over the click action.

If you need to find an element before clicking it, consider using the [`find`](/docs/get-started/actions/find) action, which lets you locate elements and optionally click them in a single step.

**Note:** If you use the `click` action without specifying a target (using element text or selector), it will click the active element or the element at the current cursor position.

## Properties

When using the object format, you can specify:

- `button`: (Optional) Kind of click to perform. Can be `"left"`, `"right"`, or `"middle"`. Default is `"left"`.
- `selector`: (Optional) CSS or XPath selector of the element to click. If combined with `elementText`, the element must match both the text and the selector.
- `elementText`: (Optional) Display text of the element to click. If combined with `selector`, the element must match both the text and the selector.

> For comprehensive options, see the full [`click`](/docs/references/schemas/click) reference.

## Examples

Here are a few ways you might use the `click` action:

### Click by element text (string shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Click on an element with text 'Submit'",
          "click": "Submit"
        }
      ]
    }
  ]
}
```

### Click by selector (string shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Click on an element matching the CSS selector",
          "click": "#submit-button"
        }
      ]
    }
  ]
}
```

### Click an element by text (object format)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Left-click on a button with specific text",
          "click": {
            "elementText": "Submit",
            "button": "left"
          }
        }
      ]
    }
  ]
}
```

### Click an element by selector (object format)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Middle-click on an element with a specific selector",
          "click": {
            "selector": "#open-in-new-tab",
            "button": "middle"
          }
        }
      ]
    }
  ]
}
```

### Click an element by both selector and text

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Click on a specific element matching both selector and text",
          "click": {
            "selector": ".btn",
            "elementText": "Download",
            "button": "left"
          }
        }
      ]
    }
  ]
}
```

## Related Actions

- [`find`](/docs/get-started/actions/find): Find an element and optionally interact with it
- [`type`](/docs/get-started/actions/type): Type text or special keys
