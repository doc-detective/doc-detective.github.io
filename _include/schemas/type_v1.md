# type Schema

```txt
undefined
```

Click an element specified by a CSS sepector.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [type\_v1.schema.json](type_v1.schema.json "open original schema") |

## type Type

`object` ([type](type_v1.md))

any of

*   [Untitled undefined type in type](type_v1-anyof-0.md "check type definition")

*   [Untitled undefined type in type](type_v1-anyof-1.md "check type definition")

## type Examples

```json
{
  "action": "type",
  "css": "[title=Search]",
  "keys": "kittens"
}
```

```json
{
  "action": "type",
  "css": "[title=Search]",
  "trailingSpecialKey": "Enter"
}
```

```json
{
  "action": "type",
  "css": "[title=Search]",
  "keys": "kittens",
  "trailingSpecialKey": "Enter"
}
```

# type Properties

| Property                                  | Type     | Required | Nullable       | Defined by                                                                                  |
| :---------------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------ |
| [action](#action)                         | `string` | Required | cannot be null | [type](type_v1-properties-action.md "undefined#/properties/action")                         |
| [css](#css)                               | `string` | Required | cannot be null | [type](type_v1-properties-css.md "undefined#/properties/css")                               |
| [keys](#keys)                             | `string` | Optional | cannot be null | [type](type_v1-properties-keys.md "undefined#/properties/keys")                             |
| [trailingSpecialKey](#trailingspecialkey) | `string` | Optional | cannot be null | [type](type_v1-properties-trailingspecialkey.md "undefined#/properties/trailingSpecialKey") |
| [env](#env)                               | `string` | Optional | cannot be null | [type](type_v1-properties-env.md "undefined#/properties/env")                               |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [type](type_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"type"
```

## css

CSS selector that uniquely identified the element.

`css`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [type](type_v1-properties-css.md "undefined#/properties/css")

### css Type

`string`

## keys

String of keys to enter.

`keys`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [type](type_v1-properties-keys.md "undefined#/properties/keys")

### keys Type

`string`

## trailingSpecialKey

Special key pressed after the 'keys' value, if present. Supported values: <https://github.com/puppeteer/puppeteer/blob/main/src/common/USKeyboardLayout.ts>

`trailingSpecialKey`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [type](type_v1-properties-trailingspecialkey.md "undefined#/properties/trailingSpecialKey")

### trailingSpecialKey Type

`string`

## env

Path to a `.env` file to load before performing the action.

`env`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [type](type_v1-properties-env.md "undefined#/properties/env")

### env Type

`string`
