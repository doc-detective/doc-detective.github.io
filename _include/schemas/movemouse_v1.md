# moveMouse Schema

```txt
undefined
```

Move the mouse to an element specified by a CSS sepector. Only runs if a test is being recorded.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                   |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [moveMouse\_v1.schema.json](moveMouse_v1.schema.json "open original schema") |

## moveMouse Type

`object` ([moveMouse](movemouse_v1.md))

## moveMouse Examples

```json
{
  "action": "moveMouse",
  "css": "[title=Search]"
}
```

```json
{
  "action": "moveMouse",
  "css": "[title=Search]",
  "alignH": "center",
  "alignV": "center",
  "offsetX": 10,
  "offsetY": 10
}
```

# moveMouse Properties

| Property            | Type      | Required | Nullable       | Defined by                                                                      |
| :------------------ | :-------- | :------- | :------------- | :------------------------------------------------------------------------------ |
| [action](#action)   | `string`  | Required | cannot be null | [moveMouse](movemouse_v1-properties-action.md "undefined#/properties/action")   |
| [css](#css)         | `string`  | Required | cannot be null | [moveMouse](movemouse_v1-properties-css.md "undefined#/properties/css")         |
| [alignH](#alignh)   | `string`  | Optional | cannot be null | [moveMouse](movemouse_v1-properties-alignh.md "undefined#/properties/alignH")   |
| [alignV](#alignv)   | `string`  | Optional | cannot be null | [moveMouse](movemouse_v1-properties-alignv.md "undefined#/properties/alignV")   |
| [offsetX](#offsetx) | `integer` | Optional | cannot be null | [moveMouse](movemouse_v1-properties-offsetx.md "undefined#/properties/offsetX") |
| [offsetY](#offsety) | `integer` | Optional | cannot be null | [moveMouse](movemouse_v1-properties-offsety.md "undefined#/properties/offsetY") |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [moveMouse](movemouse_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"moveMouse"
```

## css

CSS selector that uniquely identified the element.

`css`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [moveMouse](movemouse_v1-properties-css.md "undefined#/properties/css")

### css Type

`string`

## alignH

Horizantal alignment of the mouse to the element.

`alignH`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [moveMouse](movemouse_v1-properties-alignh.md "undefined#/properties/alignH")

### alignH Type

`string`

### alignH Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"left"`   |             |
| `"center"` |             |
| `"right"`  |             |

## alignV

Vertical alignment of the mouse to the element.

`alignV`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [moveMouse](movemouse_v1-properties-alignv.md "undefined#/properties/alignV")

### alignV Type

`string`

### alignV Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"left"`   |             |
| `"center"` |             |
| `"right"`  |             |

## offsetX

Number of pixels to offset the mouse along the X axis, relative to the element center. Positive values offset to the right. Negative values offset to the left.

`offsetX`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [moveMouse](movemouse_v1-properties-offsetx.md "undefined#/properties/offsetX")

### offsetX Type

`integer`

## offsetY

Number of pixels to offset the mouse along the Y axis, relative to the element center. Positive values offset to the top. Negative values offset to the bottom.

`offsetY`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [moveMouse](movemouse_v1-properties-offsety.md "undefined#/properties/offsetY")

### offsetY Type

`integer`
