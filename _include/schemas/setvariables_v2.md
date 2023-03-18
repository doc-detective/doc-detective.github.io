# setVariables Schema

```txt
undefined
```

Load environment variables from a `.env` file.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [setVariables\_v2.schema.json](setVariables_v2.schema.json "open original schema") |

## setVariables Type

`object` ([setVariables](setvariables_v2.md))

## setVariables Examples

```json
{
  "action": "setVariables",
  "path": ".env"
}
```

# setVariables Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                    |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------- |
| [id](#id)                   | `string` | Optional | cannot be null | [setVariables](setvariables_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string` | Optional | cannot be null | [setVariables](setvariables_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string` | Required | cannot be null | [setVariables](setvariables_v2-properties-action.md "undefined#/properties/action")           |
| [path](#path)               | `string` | Required | cannot be null | [setVariables](setvariables_v2-properties-path.md "undefined#/properties/path")               |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [setVariables](setvariables_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [setVariables](setvariables_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

Action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [setVariables](setvariables_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"setVariables"
```

## path

Path to the `.env` file.

`path`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [setVariables](setvariables_v2-properties-path.md "undefined#/properties/path")

### path Type

`string`
