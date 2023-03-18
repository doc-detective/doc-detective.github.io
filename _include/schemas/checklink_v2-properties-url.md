# Untitled string in checkLink Schema

```txt
undefined#/properties/url
```

URL to check.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [checkLink\_v2.schema.json\*](checkLink_v2.schema.json "open original schema") |

## url Type

`string`

## url Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^(http://|https://).*
```

[try pattern](https://regexr.com/?expression=%5E\(http%3A%2F%2F%7Chttps%3A%2F%2F\).* "try regular expression with regexr.com")

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")
