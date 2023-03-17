# checkLink Schema

```txt
undefined
```

Check if a URI returns an acceptable status code from a GET request.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                   |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [checkLink\_v1.schema.json](checkLink_v1.schema.json "open original schema") |

## checkLink Type

`object` ([checkLink](checklink_v1.md))

## checkLink Examples

```json
{
  "action": "checkLink",
  "uri": "https://www.google.com"
}
```

```json
{
  "action": "checkLink",
  "uri": "https://www.google.com",
  "statusCodes": [
    200
  ]
}
```

# checkLink Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                              |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------- |
| [action](#action)           | `string` | Required | cannot be null | [checkLink](checklink_v1-properties-action.md "undefined#/properties/action")           |
| [uri](#uri)                 | `string` | Required | cannot be null | [checkLink](checklink_v1-properties-uri.md "undefined#/properties/uri")                 |
| [statusCodes](#statuscodes) | `array`  | Optional | cannot be null | [checkLink](checklink_v1-properties-statuscodes.md "undefined#/properties/statusCodes") |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [checkLink](checklink_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"checkLink"
```

## uri

URI to check.

`uri`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [checkLink](checklink_v1-properties-uri.md "undefined#/properties/uri")

### uri Type

`string`

## statusCodes



`statusCodes`

*   is optional

*   Type: `integer[]`

*   cannot be null

*   defined in: [checkLink](checklink_v1-properties-statuscodes.md "undefined#/properties/statusCodes")

### statusCodes Type

`integer[]`

### statusCodes Default Value

The default value is:

```json
[
  200
]
```
