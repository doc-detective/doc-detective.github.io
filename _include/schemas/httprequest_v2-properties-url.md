# Untitled string in httpRequest Schema

```txt
undefined#/properties/url
```

URL for the HTTP request.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                         |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [httpRequest\_v2.schema.json\*](httpRequest_v2.schema.json "open original schema") |

## url Type

`string`

## url Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^(http://|https://).*
```

[try pattern](https://regexr.com/?expression=%5E\(http%3A%2F%2F%7Chttps%3A%2F%2F\).* "try regular expression with regexr.com")

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")
