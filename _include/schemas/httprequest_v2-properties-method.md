# Untitled string in httpRequest Schema

```txt
undefined#/properties/method
```

Method of the HTTP request

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                         |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [httpRequest\_v2.schema.json\*](httpRequest_v2.schema.json "open original schema") |

## method Type

`string`

## method Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"get"`    |             |
| `"put"`    |             |
| `"post"`   |             |
| `"patch"`  |             |
| `"delete"` |             |

## method Default Value

The default value is:

```json
"get"
```
