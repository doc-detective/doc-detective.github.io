---
title: typeKeys
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
---

# typeKeys

The `typeKeys` action registers key presses, including special keys such as Enter. This action is useful for simulating user input, such as filling out a form, navigating a website, or using keyboard shortcuts.

For comprehensive options, see the [typeKeys](/reference/schemas/typeKeys) reference.

## Special keys

You can use special keys in the `keys` field to simulate key presses. To use a special key, enclose the key name in `$` characters. For example, to simulate pressing the Enter key, use `$Enter$`.

Here's a list of special keys you can use:



## Examples

```json
{
  "description": "Set environment variables from a .env file.",
  "action": "typeKeys",
  "path": "./secrets.env"
}
```