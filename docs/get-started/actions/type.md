---
title: type
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Type keys, including special keys like Enter.
---

# type

The `type` action simulates key presses, including special keys such as Enter. This action is useful for simulating user input, such as filling out a form, navigating a website, or using keyboard shortcuts. It typically requires a preceding `find` or `click` action to focus an input element.

You can specify the keys to type in several ways:

- **String Shorthand:** Provide a simple string as the value for the `type` key.
- **Array Shorthand:** Provide an array of strings. Each string in the array is typed sequentially. This allows mixing regular text with [special keys](#special-keys).
- **Object Format:** Use an object for more control:
  - `keys`: (Required) A string or an array of strings representing the keys to type.
  - `inputDelay`: (Optional) Delay in milliseconds between each key press. Useful for making recordings more legible.

> For comprehensive options, see the [`type`](/docs/references/schemas/type) reference.

## Special keys

You can use special keys in the `keys` field to simulate non-character key presses. To use a special key, use the key's associated code enclosed in `$` symbols. For example, to simulate pressing the Enter key, use `$ENTER$`.

Here's a list of special keys you can use:

| Key            | Code               |
| -------------- | ------------------ |
| Alt            | $ALT$              |
| Backspace      | $BACKSPACE$        |
| Cancel         | $CANCEL$           |
| Clear          | $CLEAR$            |
| Command        | $COMMAND$          |
| Control        | $CTRL$             |
| Delete         | $DELETE$           |
| End            | $END$              |
| Enter          | $ENTER$            |
| Escape         | $ESCAPE$           |
| Help           | $HELP$             |
| Home           | $HOME$             |
| Insert         | $INSERT$           |
| NULL           | $NULL$             |
| Page Down      | $PAGE_DOWN$        |
| Page Up        | $PAGE_UP$          |
| Pause          | $PAUSE$            |
| Return         | $RETURN$           |
| Shift          | $SHIFT$            |
| Space          | $SPACE$            |
| Tab            | $TAB$              |
| ZenkakuHankaku | $ZANKAKU_HANDKAKU$ |
| Arrow Down     | $ARROW_DOWN$       |
| Arrow Left     | $ARROW_LEFT$       |
| Arrow Right    | $ARROW_RIGHT$      |
| Arrow Up       | $ARROW_UP$         |
| Numpad 0       | $NUMPAD_0$         |
| Numpad 1       | $NUMPAD_1$         |
| Numpad 2       | $NUMPAD_2$         |
| Numpad 3       | $NUMPAD_3$         |
| Numpad 4       | $NUMPAD_4$         |
| Numpad 5       | $NUMPAD_5$         |
| Numpad 6       | $NUMPAD_6$         |
| Numpad 7       | $NUMPAD_7$         |
| Numpad 8       | $NUMPAD_8$         |
| Numpad 9       | $NUMPAD_9$         |
| :              | $SEMICOLON$        |
| =              | $EQUALS$           |
| \*             | $MULTIPLY$         |
| +              | $ADD$              |
| \|             | $SEPARATOR$        |
| -              | $SUBSTRACT$        |
| .              | $DECIMAL$          |
| /              | $DIVIDE$           |
| F1             | $F1$               |
| F2             | $F2$               |
| F3             | $F3$               |
| F4             | $F4$               |
| F5             | $F5$               |
| F6             | $F6$               |
| F7             | $F7$               |
| F8             | $F8$               |
| F9             | $F9$               |
| F10            | $F10$              |
| F11            | $F11$              |
| F12            | $F12$              |

## Examples

### Perform a search (array shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Go to Google",
          "goTo": "https://www.google.com"
        },
        {
          "description": "Find and click the search bar",
          "find": {
            "selector": "[title=Search]",
            "click": true
          }
        },
        {
          "description": "Type search query and press Enter",
          "type": ["American Shorthair kittens", "$ENTER$"]
        }
      ]
    }
  ]
}
```

### Fill credentials from environment variables (string shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Load credentials",
          "loadVariables": ".env"
        },
        {
          "description": "Go to login page",
          "goTo": "https://console.acme.com/login"
        },
        {
          "description": "Find, click, and type username",
          "find": {
            "selector": "#username",
            "click": true,
            "type": "$USERNAME" // Type directly within find
          }
        },
        {
          "description": "Find, click, and type password, then press Enter",
          "find": {
            "selector": "#password",
            "click": true,
            "type": ["$PASSWORD", "$ENTER$"] // Type array within find
          }
        }
      ]
    }
  ]
}
```

### Type with an increased delay (object format)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Go to Google",
          "goTo": "https://www.google.com"
        },
        {
          "description": "Start recording",
          "record": "recording.webm"
        },
        {
          "description": "Find and click search bar",
          "find": {
            "selector": "[title=Search]",
            "click": true
          }
        },
        {
          "description": "Type slowly and press Enter",
          "type": {
            "keys": ["American Shorthair kittens", "$ENTER$"],
            "inputDelay": 500
          }
        },
        {
          "description": "Stop recording",
          "stopRecord": true
        }
      ]
    }
  ]
}
```
