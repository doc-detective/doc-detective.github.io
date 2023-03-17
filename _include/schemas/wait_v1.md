# wait Schema

```txt
undefined
```

Pause before performing the next action.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [wait\_v1.schema.json](wait_v1.schema.json "open original schema") |

## wait Type

`object` ([wait](wait_v1.md))

## wait Examples

```json
{
  "action": "wait"
}
```

```json
{
  "action": "wait",
  "css": "[title=Search]"
}
```

```json
{
  "action": "wait",
  "duration": 5000
}
```

```json
{
  "action": "wait",
  "css": "[title=Search]",
  "duration": 5000
}
```

# wait Properties

| Property              | Type     | Required | Nullable       | Defined by                                                              |
| :-------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------- |
| [action](#action)     | `string` | Required | cannot be null | [wait](wait_v1-properties-action.md "undefined#/properties/action")     |
| [css](#css)           | `string` | Optional | cannot be null | [wait](wait_v1-properties-css.md "undefined#/properties/css")           |
| [duration](#duration) | `number` | Optional | cannot be null | [wait](wait_v1-properties-duration.md "undefined#/properties/duration") |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [wait](wait_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"wait"
```

## css

CSS selector that uniquely identified the element to find.

`css`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [wait](wait_v1-properties-css.md "undefined#/properties/css")

### css Type

`string`

## duration

Seconds to wait. If `css` is set, the maximum duration to wait for the element to become available.

`duration`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [wait](wait_v1-properties-duration.md "undefined#/properties/duration")

### duration Type

`number`

### duration Default Value

The default value is:

```json
10000
```
