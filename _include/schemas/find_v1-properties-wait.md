# Untitled object in find Schema

```txt
undefined#/properties/wait
```

Pause before performing the next action.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [find\_v1.schema.json\*](find_v1.schema.json "open original schema") |

## wait Type

`object` ([Details](find_v1-properties-wait.md))

# wait Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                              |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| [duration](#duration) | `number` | Optional | cannot be null | [find](find_v1-properties-wait-properties-duration.md "undefined#/properties/wait/properties/duration") |

## duration

Seconds to wait. If `css` is set, the maximum duration to wait for the element to become available.

`duration`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [find](find_v1-properties-wait-properties-duration.md "undefined#/properties/wait/properties/duration")

### duration Type

`number`

### duration Default Value

The default value is:

```json
10000
```
