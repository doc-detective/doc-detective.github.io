# scroll Schema

```txt
undefined
```

Scroll the page by the specified number of pixels. Only runs if a test is being recorded.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [scroll\_v1.schema.json](scroll_v1.schema.json "open original schema") |

## scroll Type

`object` ([scroll](scroll_v1.md))

any of

*   [Untitled undefined type in scroll](scroll_v1-anyof-0.md "check type definition")

*   [Untitled undefined type in scroll](scroll_v1-anyof-1.md "check type definition")

## scroll Examples

```json
{
  "action": "scroll",
  "x": 100
}
```

```json
{
  "action": "scroll",
  "y": 100
}
```

```json
{
  "action": "scroll",
  "x": 100,
  "y": 100
}
```

# scroll Properties

| Property          | Type      | Required | Nullable       | Defined by                                                              |
| :---------------- | :-------- | :------- | :------------- | :---------------------------------------------------------------------- |
| [action](#action) | `string`  | Required | cannot be null | [scroll](scroll_v1-properties-action.md "undefined#/properties/action") |
| [x](#x)           | `integer` | Optional | cannot be null | [scroll](scroll_v1-properties-x.md "undefined#/properties/x")           |
| [y](#y)           | `integer` | Optional | cannot be null | [scroll](scroll_v1-properties-y.md "undefined#/properties/y")           |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [scroll](scroll_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"scroll"
```

## x

Number of pixels to scroll along the X axis. Positive values scroll to the right. Negative values scroll to the left.

`x`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [scroll](scroll_v1-properties-x.md "undefined#/properties/x")

### x Type

`integer`

## y

Number of pixels to scroll along the Y axis. Positive values scroll to the top. Negative values scroll to the bottom.

`y`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [scroll](scroll_v1-properties-y.md "undefined#/properties/y")

### y Type

`integer`
