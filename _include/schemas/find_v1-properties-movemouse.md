# Untitled object in find Schema

```txt
undefined#/properties/moveMouse
```

Move the mouse to an element specified by a CSS sepector. Only runs if a test is being recorded.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [find\_v1.schema.json\*](find_v1.schema.json "open original schema") |

## moveMouse Type

`object` ([Details](find_v1-properties-movemouse.md))

# moveMouse Properties

| Property            | Type      | Required | Nullable       | Defined by                                                                                                      |
| :------------------ | :-------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------- |
| [alignH](#alignh)   | `string`  | Optional | cannot be null | [find](find_v1-properties-movemouse-properties-alignh.md "undefined#/properties/moveMouse/properties/alignH")   |
| [alignV](#alignv)   | `string`  | Optional | cannot be null | [find](find_v1-properties-movemouse-properties-alignv.md "undefined#/properties/moveMouse/properties/alignV")   |
| [offsetX](#offsetx) | `integer` | Optional | cannot be null | [find](find_v1-properties-movemouse-properties-offsetx.md "undefined#/properties/moveMouse/properties/offsetX") |
| [offsetY](#offsety) | `integer` | Optional | cannot be null | [find](find_v1-properties-movemouse-properties-offsety.md "undefined#/properties/moveMouse/properties/offsetY") |

## alignH

Horizantal alignment of the mouse to the element.

`alignH`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v1-properties-movemouse-properties-alignh.md "undefined#/properties/moveMouse/properties/alignH")

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

*   defined in: [find](find_v1-properties-movemouse-properties-alignv.md "undefined#/properties/moveMouse/properties/alignV")

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

*   defined in: [find](find_v1-properties-movemouse-properties-offsetx.md "undefined#/properties/moveMouse/properties/offsetX")

### offsetX Type

`integer`

## offsetY

Number of pixels to offset the mouse along the Y axis, relative to the element center. Positive values offset to the top. Negative values offset to the bottom.

`offsetY`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [find](find_v1-properties-movemouse-properties-offsety.md "undefined#/properties/moveMouse/properties/offsetY")

### offsetY Type

`integer`
