# matchText Schema

```txt
undefined
```

Check if an element displays the expected text.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                   |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [matchText\_v1.schema.json](matchText_v1.schema.json "open original schema") |

## matchText Type

`object` ([matchText](matchtext_v1.md))

## matchText Examples

```json
{
  "action": "matchText",
  "css": "#gbqfbb",
  "text": "I'm Feeling Lucky"
}
```

# matchText Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                    |
| :---------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------- |
| [action](#action) | `string` | Required | cannot be null | [matchText](matchtext_v1-properties-action.md "undefined#/properties/action") |
| [css](#css)       | `string` | Required | cannot be null | [matchText](matchtext_v1-properties-css.md "undefined#/properties/css")       |
| [text](#text)     | `string` | Required | cannot be null | [matchText](matchtext_v1-properties-text.md "undefined#/properties/text")     |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [matchText](matchtext_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"matchText"
```

## css

CSS selector that uniquely identified the element.

`css`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [matchText](matchtext_v1-properties-css.md "undefined#/properties/css")

### css Type

`string`

## text

Text that the element should display.

`text`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [matchText](matchtext_v1-properties-text.md "undefined#/properties/text")

### text Type

`string`
