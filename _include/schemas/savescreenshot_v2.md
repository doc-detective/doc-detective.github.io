# saveScreenshot Schema

```txt
undefined
```

Takes a screenshot in PNG format.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [saveScreenshot\_v2.schema.json](saveScreenshot_v2.schema.json "open original schema") |

## saveScreenshot Type

`object` ([saveScreenshot](savescreenshot_v2.md))

## saveScreenshot Examples

```json
{
  "action": "saveScreenshot"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png"
}
```

# saveScreenshot Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                        |
| :-------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------ |
| [id](#id)                   | `string` | Optional | cannot be null | [saveScreenshot](savescreenshot_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string` | Optional | cannot be null | [saveScreenshot](savescreenshot_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string` | Required | cannot be null | [saveScreenshot](savescreenshot_v2-properties-action.md "undefined#/properties/action")           |
| [path](#path)               | `string` | Optional | cannot be null | [saveScreenshot](savescreenshot_v2-properties-path.md "undefined#/properties/path")               |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [saveScreenshot](savescreenshot_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [saveScreenshot](savescreenshot_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

The action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [saveScreenshot](savescreenshot_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"saveScreenshot"
```

## path

File path of the PNG file. If not specified, the file path is your media directory and the file name is the ID of the step.

`path`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [saveScreenshot](savescreenshot_v2-properties-path.md "undefined#/properties/path")

### path Type

`string`

### path Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
[A-Za-z0-9_-]*\.(png|PNG)$
```

[try pattern](https://regexr.com/?expression=%5BA-Za-z0-9_-%5D*%5C.\(png%7CPNG\)%24 "try regular expression with regexr.com")
