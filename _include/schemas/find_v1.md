# find Schema

```txt
undefined
```

Check if an element exists with the specified CSS selector.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [find\_v1.schema.json](find_v1.schema.json "open original schema") |

## find Type

`object` ([find](find_v1.md))

## find Examples

```json
{
  "action": "find",
  "css": "[title=Search]"
}
```

```json
{
  "action": "find",
  "css": "[title=Search]",
  "wait": {
    "duration": 10000
  },
  "matchText": {
    "text": "Search"
  },
  "moveMouse": {
    "alignH": "center",
    "alignV": "center",
    "offsetX": 0,
    "offsetY": 0
  },
  "click": {},
  "type": {
    "keys": "$SHORTHAIR_CAT_SEARCH",
    "trailingSpecialKey": "Enter",
    "env": "./sample/variables.env"
  }
}
```

# find Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                |
| :---------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------ |
| [action](#action)       | `string` | Required | cannot be null | [find](find_v1-properties-action.md "undefined#/properties/action")       |
| [css](#css)             | `string` | Required | cannot be null | [find](find_v1-properties-css.md "undefined#/properties/css")             |
| [wait](#wait)           | `object` | Optional | cannot be null | [find](find_v1-properties-wait.md "undefined#/properties/wait")           |
| [matchText](#matchtext) | `object` | Optional | cannot be null | [find](find_v1-properties-matchtext.md "undefined#/properties/matchText") |
| [moveMouse](#movemouse) | `object` | Optional | cannot be null | [find](find_v1-properties-movemouse.md "undefined#/properties/moveMouse") |
| [click](#click)         | `object` | Optional | cannot be null | [find](find_v1-properties-click.md "undefined#/properties/click")         |
| [type](#type)           | Merged   | Optional | cannot be null | [find](find_v1-properties-type.md "undefined#/properties/type")           |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"find"
```

## css

CSS selector that uniquely identified the element.

`css`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v1-properties-css.md "undefined#/properties/css")

### css Type

`string`

## wait

Pause before performing the next action.

`wait`

*   is optional

*   Type: `object` ([Details](find_v1-properties-wait.md))

*   cannot be null

*   defined in: [find](find_v1-properties-wait.md "undefined#/properties/wait")

### wait Type

`object` ([Details](find_v1-properties-wait.md))

## matchText

Check if an element displays the expected text.

`matchText`

*   is optional

*   Type: `object` ([Details](find_v1-properties-matchtext.md))

*   cannot be null

*   defined in: [find](find_v1-properties-matchtext.md "undefined#/properties/matchText")

### matchText Type

`object` ([Details](find_v1-properties-matchtext.md))

## moveMouse

Move the mouse to an element specified by a CSS sepector. Only runs if a test is being recorded.

`moveMouse`

*   is optional

*   Type: `object` ([Details](find_v1-properties-movemouse.md))

*   cannot be null

*   defined in: [find](find_v1-properties-movemouse.md "undefined#/properties/moveMouse")

### moveMouse Type

`object` ([Details](find_v1-properties-movemouse.md))

## click

Click an element specified by a CSS sepector.

`click`

*   is optional

*   Type: `object` ([Details](find_v1-properties-click.md))

*   cannot be null

*   defined in: [find](find_v1-properties-click.md "undefined#/properties/click")

### click Type

`object` ([Details](find_v1-properties-click.md))

## type

Click an element specified by a CSS sepector.

`type`

*   is optional

*   Type: `object` ([Details](find_v1-properties-type.md))

*   cannot be null

*   defined in: [find](find_v1-properties-type.md "undefined#/properties/type")

### type Type

`object` ([Details](find_v1-properties-type.md))

any of

*   [Untitled undefined type in find](find_v1-properties-type-anyof-0.md "check type definition")

*   [Untitled undefined type in find](find_v1-properties-type-anyof-1.md "check type definition")
