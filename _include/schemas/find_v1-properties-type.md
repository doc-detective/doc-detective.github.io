# Untitled object in find Schema

```txt
undefined#/properties/type
```

Click an element specified by a CSS sepector.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [find\_v1.schema.json\*](find_v1.schema.json "open original schema") |

## type Type

`object` ([Details](find_v1-properties-type.md))

any of

*   [Untitled undefined type in find](find_v1-properties-type-anyof-0.md "check type definition")

*   [Untitled undefined type in find](find_v1-properties-type-anyof-1.md "check type definition")

# type Properties

| Property                                  | Type     | Required | Nullable       | Defined by                                                                                                                  |
| :---------------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [keys](#keys)                             | `string` | Optional | cannot be null | [find](find_v1-properties-type-properties-keys.md "undefined#/properties/type/properties/keys")                             |
| [trailingSpecialKey](#trailingspecialkey) | `string` | Optional | cannot be null | [find](find_v1-properties-type-properties-trailingspecialkey.md "undefined#/properties/type/properties/trailingSpecialKey") |
| [env](#env)                               | `string` | Optional | cannot be null | [find](find_v1-properties-type-properties-env.md "undefined#/properties/type/properties/env")                               |

## keys

String of keys to enter.

`keys`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v1-properties-type-properties-keys.md "undefined#/properties/type/properties/keys")

### keys Type

`string`

## trailingSpecialKey

Special key pressed after the 'keys' value, if present. Supported values: <https://github.com/puppeteer/puppeteer/blob/main/src/common/USKeyboardLayout.ts>

`trailingSpecialKey`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v1-properties-type-properties-trailingspecialkey.md "undefined#/properties/type/properties/trailingSpecialKey")

### trailingSpecialKey Type

`string`

## env

Path to a `.env` file to load before performing the action.

`env`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v1-properties-type-properties-env.md "undefined#/properties/type/properties/env")

### env Type

`string`
