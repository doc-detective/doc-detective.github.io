# runShell Schema

```txt
undefined
```

Perform a native shell command.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [runShell\_v1.schema.json](runShell_v1.schema.json "open original schema") |

## runShell Type

`object` ([runShell](runshell_v1.md))

## runShell Examples

```json
{
  "action": "runShell",
  "command": "echo $username"
}
```

```json
{
  "action": "runShell",
  "command": "echo $username",
  "env": "./variables.env"
}
```

# runShell Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                    |
| :------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------- |
| [action](#action)   | `string` | Required | cannot be null | [runShell](runshell_v1-properties-action.md "undefined#/properties/action")   |
| [command](#command) | `string` | Required | cannot be null | [runShell](runshell_v1-properties-command.md "undefined#/properties/command") |
| [env](#env)         | `string` | Optional | cannot be null | [runShell](runshell_v1-properties-env.md "undefined#/properties/env")         |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [runShell](runshell_v1-properties-action.md "undefined#/properties/action")

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

*   defined in: [runShell](runshell_v1-properties-command.md "undefined#/properties/command")

### command Type

`string`

## env

Path to a `.env` file to load before performing the action.

`env`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [runShell](runshell_v1-properties-env.md "undefined#/properties/env")

### env Type

`string`
