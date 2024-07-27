---
title: typeKeys
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
---

# typeKeys

The `typeKeys` action registers key presses, including special keys such as Enter. This action is useful for simulating user input, such as filling out a form, navigating a website, or using keyboard shortcuts.

You can specify `keys` either as a string or as an array of strings. Each character in a string or array is separated is treated as a separate key press, but specifying an array allows you to include both regular and [special](#special-keys) keys.

For comprehensive options, see the [typeKeys](/docs/schemas/typeKeys) reference.

## Special keys

You can use special keys in the `keys` field to simulate key presses. To use a special key, use the key's associated code. For example, to simulate pressing the Enter key, use `$Enter$`.

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

### Perform a search

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "goTo",
          "url": "https://www.google.com"
        },
        {
          "action": "find",
          "selector": "[title=Search]",
          "click": true
        },
        {
          "action": "typeKeys",
          "keys": ["American Shorthair kittens", "$ENTER$"]
        }
      ]
    }
  ]
}
```

### Fill credentials from environment variables

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "setVariables",
          "path": ".env"
        },
        {
          "action": "goTo",
          "url": "https://console.acme.com/login"
        },
        {
          "action": "find",
          "selector": "#username",
          "click": true
        },
        {
          "action": "typeKeys",
          "keys": ["$USERNAME"]
        },
        {
          "action": "find",
          "selector": "#password",
          "click": true
        },
        {
          "action": "typeKeys",
          "keys": ["$PASSWORD", "$ENTER$"]
        }
      ]
    }
  ]
}
```

### Type with an increased delay for legibility in recordings
```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "goTo",
          "url": "https://www.google.com"
        },
        {
          "action": "startRecording",
          "path": "recording.webm"
        },
        {
          "action": "find",
          "selector": "[title=Search]",
          "click": true
        },
        {
          "action": "typeKeys",
          "keys": ["American Shorthair kittens", "$ENTER$"],
          "delay": 500
        },
        {
          "action": "stopRecording"
        }
      ]
    }
  ]
}
```
