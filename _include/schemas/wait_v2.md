# wait Schema

```txt
undefined
```

Pause before performing the next action.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [wait\_v2.schema.json](wait_v2.schema.json "open original schema") |

## wait Type

`object` ([wait](wait_v2.md))

## wait Examples

```json
{
  "action": "wait"
}
```

```json
{
  "action": "wait",
  "duration": 5000
}
```

# wait Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                    |
| :-------------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------- |
| [id](#id)                   | `string` | Optional | cannot be null | [wait](wait_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string` | Optional | cannot be null | [wait](wait_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string` | Required | cannot be null | [wait](wait_v2-properties-action.md "undefined#/properties/action")           |
| [duration](#duration)       | `number` | Optional | cannot be null | [wait](wait_v2-properties-duration.md "undefined#/properties/duration")       |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [wait](wait_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [wait](wait_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

The action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [wait](wait_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"wait"
```

## duration

Milliseconds to wait.

`duration`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [wait](wait_v2-properties-duration.md "undefined#/properties/duration")

### duration Type

`number`

### duration Default Value

The default value is:

```json
500
```
