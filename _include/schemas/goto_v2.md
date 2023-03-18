# goTo Schema

```txt
undefined
```

Navigate to a specified URL.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [goTo\_v2.schema.json](goTo_v2.schema.json "open original schema") |

## goTo Type

`object` ([goTo](goto_v2.md))

## goTo Examples

```json
{
  "action": "goTo",
  "url": "https://www.google.com"
}
```

```json
{
  "id": "ddec5e20-2e81-4f38-867c-92c8d9516755",
  "description": "This is a test!",
  "action": "goTo",
  "url": "https://www.google.com"
}
```

# goTo Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                    |
| :-------------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------- |
| [id](#id)                   | `string` | Optional | cannot be null | [goTo](goto_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string` | Optional | cannot be null | [goTo](goto_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string` | Required | cannot be null | [goTo](goto_v2-properties-action.md "undefined#/properties/action")           |
| [url](#url)                 | `string` | Required | cannot be null | [goTo](goto_v2-properties-url.md "undefined#/properties/url")                 |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [goTo](goto_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [goTo](goto_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

Action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [goTo](goto_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"goTo"
```

## url

URL to navigate to.

`url`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [goTo](goto_v2-properties-url.md "undefined#/properties/url")

### url Type

`string`

### url Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")
