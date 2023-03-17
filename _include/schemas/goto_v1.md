# goTo Schema

```txt
undefined
```

Navigate to a specified URI.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [goTo\_v1.schema.json](goTo_v1.schema.json "open original schema") |

## goTo Type

`object` ([goTo](goto_v1.md))

## goTo Examples

```json
{
  "action": "goTo",
  "uri": "https://www.google.com"
}
```

```json
{
  "action": "goTo",
  "uri": "$URI"
}
```

# goTo Properties

| Property          | Type     | Required | Nullable       | Defined by                                                          |
| :---------------- | :------- | :------- | :------------- | :------------------------------------------------------------------ |
| [action](#action) | `string` | Required | cannot be null | [goTo](goto_v1-properties-action.md "undefined#/properties/action") |
| [uri](#uri)       | `string` | Required | cannot be null | [goTo](goto_v1-properties-uri.md "undefined#/properties/uri")       |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [goTo](goto_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"goTo"
```

## uri

URI to navigate to.

`uri`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [goTo](goto_v1-properties-uri.md "undefined#/properties/uri")

### uri Type

`string`
