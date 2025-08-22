---
sidebar_position: 5
---

# Drag and Drop Tutorial

This tutorial demonstrates how to use Doc Detective's `dragAndDrop` action to test drag and drop functionality in web applications. You'll learn how to drag elements from one location to another and verify the interaction works correctly.

## Prerequisites

Before starting this tutorial, make sure you have:

- [Set up your test environment](/docs/get-started/tutorials/set-up-your-test-environment)
- Doc Detective installed (`npm install -g doc-detective`)
- A basic understanding of [Doc Detective concepts](/docs/get-started/concepts)

## What you'll build

In this tutorial, you'll create a test that:

1. Navigates to a drag and drop test page
2. Drags various widgets to different drop zones
3. Uses different targeting methods (text, selectors, regex patterns)
4. Configures drag duration for different scenarios

## Create the test specification

Create a new file called `drag-drop-tutorial.spec.json` with the following content:

```json
{
  "tests": [
    {
      "testId": "drag-drop-tutorial",
      "description": "Tutorial demonstrating drag and drop functionality",
      "steps": [
        {
          "description": "Navigate to drag and drop test page",
          "goTo": "http://localhost:8080/drag-drop-test.html"
        },
        {
          "description": "Drag Table widget using simple text matching",
          "dragAndDrop": {
            "source": "Table",
            "target": ".drop-zone[data-drop='zone1']"
          }
        },
        {
          "description": "Drag Chart widget using detailed syntax",
          "dragAndDrop": {
            "source": {
              "selector": ".draggable",
              "elementText": "Chart"
            },
            "target": {
              "selector": ".drop-zone[data-drop='zone2']"
            },
            "duration": 1500
          }
        },
        {
          "description": "Drag Image widget using CSS selector",
          "dragAndDrop": {
            "source": ".draggable[data-widget='image']",
            "target": ".drop-zone[data-drop='zone1']",
            "duration": 500
          }
        },
        {
          "description": "Test regex pattern matching for dynamic content",
          "dragAndDrop": {
            "source": "/Widget Item.*/",
            "target": ".drop-zone[data-drop='zone2']"
          }
        },
        {
          "description": "Advanced regex matching with detailed syntax",
          "dragAndDrop": {
            "source": {
              "selector": ".draggable",
              "elementText": "/Widget.*[0-9]+/"
            },
            "target": {
              "selector": ".drop-zone"
            }
          }
        },
        {
          "description": "Take screenshot of final result",
          "screenshot": "drag-drop-results.png"
        }
      ]
    }
  ]
}
```

## Understanding the test steps

Let's break down what each step does:

### Step 1: Navigation
```json
{
  "description": "Navigate to drag and drop test page",
  "goTo": "http://localhost:8080/drag-drop-test.html"
}
```
This navigates to a test page with draggable elements and drop zones.

### Step 2: Simple drag and drop
```json
{
  "description": "Drag Table widget using simple text matching",
  "dragAndDrop": {
    "source": "Table",
    "target": ".drop-zone[data-drop='zone1']"
  }
}
```
This demonstrates the simplest form of drag and drop - finding an element by its text content ("Table") and dropping it onto a target element found by CSS selector.

### Step 3: Detailed syntax with duration
```json
{
  "description": "Drag Chart widget using detailed syntax",
  "dragAndDrop": {
    "source": {
      "selector": ".draggable",
      "elementText": "Chart"
    },
    "target": {
      "selector": ".drop-zone[data-drop='zone2']"
    },
    "duration": 1500
  }
}
```
This shows the detailed object syntax where you can combine selector and text matching for precise element targeting. The `duration` parameter controls how long the drag operation takes.

### Step 4: CSS selector targeting
```json
{
  "description": "Drag Image widget using CSS selector",
  "dragAndDrop": {
    "source": ".draggable[data-widget='image']",
    "target": ".drop-zone[data-drop='zone1']",
    "duration": 500
  }
}
```
This demonstrates using CSS selectors with attributes to target specific elements, with a faster drag duration.

### Step 5: Regex pattern matching
```json
{
  "description": "Test regex pattern matching for dynamic content",
  "dragAndDrop": {
    "source": "/Widget Item.*/",
    "target": ".drop-zone[data-drop='zone2']"
  }
}
```
This shows how to use regex patterns (wrapped in forward slashes) to match elements with dynamic or variable text content.

### Step 6: Advanced regex with detailed syntax
```json
{
  "description": "Advanced regex matching with detailed syntax",
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
This combines the detailed syntax with regex patterns for maximum flexibility in element targeting.

## Run the test

To run your drag and drop test:

```bash
npx doc-detective --input drag-drop-tutorial.spec.json
```

## Expected results

When the test runs successfully, you should see:

1. The browser navigates to the test page
2. Various widgets are dragged to different drop zones
3. Each drag operation completes successfully
4. A screenshot is captured showing the final state
5. Test results show all steps as "PASS"

## Common patterns and best practices

### Element targeting strategies

1. **Text matching**: Use when elements have unique, stable text content
   ```json
   "source": "Submit Button"
   ```

2. **CSS selectors**: Use for precise targeting with attributes or classes
   ```json
   "source": ".draggable[data-id='widget-123']"
   ```

3. **Combined matching**: Use when you need both selector and text constraints
   ```json
   "source": {
     "selector": ".widget",
     "elementText": "Chart"
   }
   ```

4. **Regex patterns**: Use for dynamic or variable content
   ```json
   "source": "/Item [0-9]+/"
   ```

### Duration considerations

- **Fast drags (100-500ms)**: For simple UI interactions
- **Medium drags (1000-1500ms)**: Default speed, good for most scenarios  
- **Slow drags (2000ms+)**: For applications that require slower movements or have animation delays

### Error handling

If your drag and drop test fails:

1. **Check element visibility**: Ensure both source and target elements are visible
2. **Verify selectors**: Use browser dev tools to test your CSS selectors
3. **Test timing**: Add `wait` steps if elements load dynamically
4. **Check for overlays**: Modal dialogs or overlays can block drag operations

## Next steps

Now that you understand drag and drop testing:

- Explore other [Doc Detective actions](/docs/category/actions)
- Learn about [test configuration options](/docs/references/schemas/config)
- Try the [Action Builder prototype](/app) for interactive test creation
- Check out more [tutorials](/docs/category/tutorials)