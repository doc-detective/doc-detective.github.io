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
- **Boolean Shorthand:** Set to `true` to perform a standard left click on the active element.
- **String Shorthand:** Specify the button type directly as `"left"`, `"right"`, or `"middle"`.
- **Object Format:** Use an object with detailed properties for more control over the click action.

If you need to find an element before clicking it, consider using the [`find`](/docs/get-started/actions/find) action, which lets you locate elements and optionally click them in a single step.

**Note:** If you use the `click` action without the `find` action, it will click the active element or the element at the current cursor position.

## Properties

When using the object format, you can specify:

- `button`: (Optional) Which mouse button to use. Can be `"left"`, `"right"`, or `"middle"`. Default is `"left"`.
- `selector`: (Optional) CSS or XPath selector of the element to click. If combined with `elementText`, the element must match both.
- `elementText`: (Optional) Display text of the element to click. If combined with `selector`, the element must match both.

> For comprehensive options, see the full [`click`](/docs/references/schemas/click) reference.

## Examples

Here are a few ways you might use the `click` action:

### Simple left click (boolean shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Click the currently focused element",
          "click": true
        }
      ]
    }
  ]
}
```

### Specify button type (string shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Right-click the currently focused element",
          "click": "right"
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
            "button": "left",
            "elementText": "Submit"
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
