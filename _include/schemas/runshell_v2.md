# runShell Schema

```txt
undefined
```

Perform a native shell command.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [runShell\_v2.schema.json](runShell_v2.schema.json "open original schema") |

## runShell Type

`object` ([runShell](runshell_v2.md))

## runShell Examples

```json
{
  "action": "runShell",
  "command": "echo",
  "args": [
    "$USER"
  ]
}
```

```json
{
  "action": "runShell",
  "command": "echo",
  "args": [
    "hello-world"
  ],
  "id": "ddec5e20-2e81-4f38-867c-92c8d9516755",
  "description": "This is a test!"
}
```

# runShell Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                            |
| :-------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------ |
| [id](#id)                   | `string` | Optional | cannot be null | [runShell](runshell_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string` | Optional | cannot be null | [runShell](runshell_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string` | Required | cannot be null | [runShell](runshell_v2-properties-action.md "undefined#/properties/action")           |
| [command](#command)         | `string` | Required | cannot be null | [runShell](runshell_v2-properties-command.md "undefined#/properties/command")         |
| [args](#args)               | `array`  | Optional | cannot be null | [runShell](runshell_v2-properties-args.md "undefined#/properties/args")               |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [runShell](runshell_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [runShell](runshell_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [runShell](runshell_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"runShell"
```

## command

Command to perform in the machine's default shell.

`command`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [runShell](runshell_v2-properties-command.md "undefined#/properties/command")

### command Type

`string`

## args

Arguments for the command.

`args`

*   is optional

*   Type: an array of merged types ([Details](runshell_v2-properties-args-items.md))

*   cannot be null

*   defined in: [runShell](runshell_v2-properties-args.md "undefined#/properties/args")

### args Type

an array of merged types ([Details](runshell_v2-properties-args-items.md))

### args Default Value

The default value is:

```json
[]
```
