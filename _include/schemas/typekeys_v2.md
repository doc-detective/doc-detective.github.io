# typeKeys Schema

```txt
undefined
```

Type keys. To type special keys, begin and end the string with `$` and use the [special key's enum](). For example, to type the Escape key, enter `$ESCAPE$`.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [typeKeys\_v2.schema.json](typeKeys_v2.schema.json "open original schema") |

## typeKeys Type

`object` ([typeKeys](typekeys_v2.md))

## typeKeys Examples

```json
{
  "action": "typeKeys",
  "keys": "kittens"
}
```

```json
{
  "action": "typeKeys",
  "keys": [
    "$ENTER$"
  ]
}
```

# typeKeys Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                            |
| :-------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------ |
| [id](#id)                   | `string` | Optional | cannot be null | [typeKeys](typekeys_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string` | Optional | cannot be null | [typeKeys](typekeys_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string` | Required | cannot be null | [typeKeys](typekeys_v2-properties-action.md "undefined#/properties/action")           |
| [keys](#keys)               | Merged   | Required | cannot be null | [typeKeys](typekeys_v2-properties-keys.md "undefined#/properties/keys")               |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [typeKeys](typekeys_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [typeKeys](typekeys_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

The action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [typeKeys](typekeys_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"typeKeys"
```

## keys

String of keys to enter.

`keys`

*   is required

*   Type: merged type ([Details](typekeys_v2-properties-keys.md))

*   cannot be null

*   defined in: [typeKeys](typekeys_v2-properties-keys.md "undefined#/properties/keys")

### keys Type

merged type ([Details](typekeys_v2-properties-keys.md))

any of

*   [Untitled string in typeKeys](typekeys_v2-properties-keys-anyof-0.md "check type definition")

*   [Untitled array in typeKeys](typekeys_v2-properties-keys-anyof-1.md "check type definition")
