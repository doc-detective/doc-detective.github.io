---
sidebar_label: CSS selectors
description: Learn how to use CSS selectors to target elements in Doc Detective tests.
---

# CSS selectors

CSS selectors are the recommended way to target elements in Doc Detective tests. They're widely used, well-documented, and work with most web elements. This guide explains how to choose and define effective CSS selectors for your tests.

## When to use CSS selectors

Use CSS selectors in Doc Detective actions like [`find`](/docs/get-started/actions/find), [`click`](/docs/get-started/actions/click), and others that accept a `selector` property. CSS selectors are ideal when:

- You need to target elements by their attributes, classes, or IDs
- You want a selector that's easy to read and maintain
- The element doesn't have easily identifiable display text

## Basic CSS selector patterns

### Target by element type

If there's only one instance of your target element on the page, you can specify the element type directly:

```json
{
  "find": {
    "selector": "input"
  }
}
```

### Target by ID

Elements with unique `id` attributes are ideal selector targets. Use the `#` prefix followed by the ID value:

```json
{
  "find": {
    "selector": "#username"
  }
}
```

**Example:** An element like `<input id="username">` can be targeted with `#username`.

### Target by class

You can target elements by their CSS class using the `.` prefix. However, classes are often shared across multiple elements, so use them carefully:

```json
{
  "find": {
    "selector": ".submit-button"
  }
}
```

**Note:** If multiple elements share the same class, Doc Detective uses the first matching element. For unique targeting, combine classes with other selectors.

### Target by attribute

Custom attributes provide reliable, unique selectors. Use square brackets with the attribute name and value:

```json
{
  "find": {
    "selector": "[type='password']"
  }
}
```

**Common attributes to target:**
- `type` (for input fields)
- `name`
- `data-testid` or `data-test` (common in test frameworks)
- `aria-label` (for accessibility-labeled elements)
- `placeholder`

## Combining selectors

When a single attribute isn't unique, combine multiple selectors to create a more specific target:

### Element with attribute

```json
{
  "find": {
    "selector": "input[type='password']"
  }
}
```

This finds an `input` element specifically with `type="password"`.

### Element with class

```json
{
  "find": {
    "selector": "button.primary"
  }
}
```

This finds a `button` element with the class `primary`.

### Multiple attributes

```json
{
  "find": {
    "selector": "input[type='text'][name='email']"
  }
}
```

This finds an `input` element with both `type="text"` and `name="email"`.

### Class combinations

```json
{
  "find": {
    "selector": ".btn.btn-primary"
  }
}
```

This finds elements with both `btn` and `btn-primary` classes.

## Advanced patterns

### Child selectors

Use `>` to select direct children:

```json
{
  "find": {
    "selector": "nav > ul > li > a"
  }
}
```

This finds an `a` element that's a direct child of an `li`, which is a direct child of a `ul`, which is a direct child of a `nav`.

### Descendant selectors

Use a space to select any descendant (not just direct children):

```json
{
  "find": {
    "selector": "div.content a"
  }
}
```

This finds any `a` element within a `div` with class `content`, regardless of nesting depth.

### Attribute contains

Use `*=` to match attributes that contain a specific value:

```json
{
  "find": {
    "selector": "[class*='button']"
  }
}
```

This matches any element whose `class` attribute contains the text "button".

### Attribute starts with

Use `^=` to match attributes that start with a specific value:

```json
{
  "find": {
    "selector": "[id^='user-']"
  }
}
```

This matches elements with IDs like `user-profile`, `user-settings`, etc.

### nth-child

Select a specific occurrence when multiple elements match:

```json
{
  "find": {
    "selector": "li:nth-child(2)"
  }
}
```

This selects the second `li` element within its parent.

## Best practices

### Use unique attributes when possible

The best selectors target elements with unique identifiers:

- **Good:** `#submit-button` or `[data-testid='submit-btn']`
- **Avoid:** `.button` (likely not unique)

### Key into test-specific attributes

Work with your engineering team to add `data-testid` or similar attributes to important elements. These attributes are designed for testing and won't change with UI updates:

```json
{
  "find": {
    "selector": "[data-testid='login-form-submit']"
  }
}
```

### Avoid fragile selectors

Selectors that are too specific can break easily when the page structure changes:

- **Fragile:** `div > div > div > span.text`
- **Better:** `[aria-label='User menu']` or `#user-menu`

### Combine selectors for uniqueness

When no single attribute is unique, combine multiple attributes:

```json
{
  "find": {
    "selector": "button[type='submit'].primary"
  }
}
```

## Finding selectors in the browser

Most modern browsers provide tools to help you identify selectors:

1. **Inspect element:** Right-click an element and select "Inspect" or "Inspect Element"
2. **Copy selector:** In the developer tools, right-click the highlighted element in the HTML pane and select "Copy" → "Copy selector"
3. **Test selector:** In the browser console, use `document.querySelector('your-selector')` to verify it targets the correct element

## Examples

### Find and click a submit button

```json
{
  "steps": [
    {
      "description": "Click the form submit button",
      "find": {
        "selector": "button[type='submit']",
        "click": true
      }
    }
  ]
}
```

### Type into a password field

```json
{
  "steps": [
    {
      "description": "Enter password",
      "find": {
        "selector": "input[type='password']",
        "click": true,
        "type": "mySecurePassword123"
      }
    }
  ]
}
```

### Click a specific navigation link

```json
{
  "steps": [
    {
      "description": "Navigate to Downloads page",
      "click": {
        "selector": "nav a[href='/downloads']"
      }
    }
  ]
}
```

### Find an element by custom data attribute

```json
{
  "steps": [
    {
      "description": "Find the user profile button",
      "find": {
        "selector": "[data-testid='user-profile-button']"
      }
    }
  ]
}
```

## Related resources

- [XPath selectors](/docs/get-started/guides/xpath-selectors): Alternative selector syntax (more complex but more powerful)
- [`find` action](/docs/get-started/actions/find): Locate and interact with elements
- [`click` action](/docs/get-started/actions/click): Click elements using selectors
- [MDN CSS Selectors Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors): Comprehensive CSS selector documentation
