# Untitled string in saveScreenshot Schema

```txt
undefined#/properties/path
```

File path of the PNG file. If not specified, the file path is your media directory and the file name is the ID of the step.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                               |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [saveScreenshot\_v2.schema.json\*](saveScreenshot_v2.schema.json "open original schema") |

## path Type

`string`

## path Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
[A-Za-z0-9_-]*\.(png|PNG)$
```

[try pattern](https://regexr.com/?expression=%5BA-Za-z0-9_-%5D*%5C.\(png%7CPNG\)%24 "try regular expression with regexr.com")
