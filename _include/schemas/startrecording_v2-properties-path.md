# Untitled string in startRecording Schema

```txt
undefined#/properties/path
```

File path of the recording. Supports the `.mp4`, `.webm`, and `.gif` extensions. If not specified, the file path is your media directory, the file name is the ID of the step, and the extension is `.mp4`.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                               |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [startRecording\_v2.schema.json\*](startRecording_v2.schema.json "open original schema") |

## path Type

`string`

## path Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
[A-Za-z0-9_-]*\.(mp4|MP4|webm|WEBM|gif|GIF)$
```

[try pattern](https://regexr.com/?expression=%5BA-Za-z0-9_-%5D*%5C.\(mp4%7CMP4%7Cwebm%7CWEBM%7Cgif%7CGIF\)%24 "try regular expression with regexr.com")
