# checkLink Schema

```txt
undefined
```

Check if a URL returns an acceptable status code from a GET request.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                   |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [checkLink\_v2.schema.json](checkLink_v2.schema.json "open original schema") |

## checkLink Type

`object` ([checkLink](checklink_v2.md))

## checkLink Examples

```json
{
  "action": "checkLink",
  "url": "https://www.google.com"
}
```

```json
{
  "action": "checkLink",
  "url": "https://www.google.com",
  "statusCodes": [
    200
  ]
}
```

# checkLink Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                              |
| :-------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------- |
| [id](#id)                   | `string` | Optional | cannot be null | [checkLink](checklink_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string` | Optional | cannot be null | [checkLink](checklink_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string` | Required | cannot be null | [checkLink](checklink_v2-properties-action.md "undefined#/properties/action")           |
| [url](#url)                 | `string` | Required | cannot be null | [checkLink](checklink_v2-properties-url.md "undefined#/properties/url")                 |
| [statusCodes](#statuscodes) | `array`  | Optional | cannot be null | [checkLink](checklink_v2-properties-statuscodes.md "undefined#/properties/statusCodes") |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [checkLink](checklink_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [checkLink](checklink_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

Action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [checkLink](checklink_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"checkLink"
```

## url

URL to check.

`url`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [checkLink](checklink_v2-properties-url.md "undefined#/properties/url")

### url Type

`string`

### url Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^(http://|https://).*
```

[try pattern](https://regexr.com/?expression=%5E\(http%3A%2F%2F%7Chttps%3A%2F%2F\).* "try regular expression with regexr.com")

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

## statusCodes



`statusCodes`

*   is optional

*   Type: an array of merged types ([Details](checklink_v2-properties-statuscodes-items.md))

*   cannot be null

*   defined in: [checkLink](checklink_v2-properties-statuscodes.md "undefined#/properties/statusCodes")

### statusCodes Type

an array of merged types ([Details](checklink_v2-properties-statuscodes-items.md))

### statusCodes Default Value

The default value is:

```json
[
  200
]
```
