
# File type (custom)



## Referenced In

- [config](/docs/references/schemas/config)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
name | string | Optional. Name of the file type. | 
extends | string | Optional. Base template to extend.<br/><br/>Accepted values: `markdown`, `asciidoc`, `html` | 
extensions | one of:<br/>- string<br/>- array of string | Required. File extensions to use with type. | 
inlineStatements | object([Inline statement definition](/docs/references/schemas/Inline statement definition)) | Optional. Statements to include tests and steps inside the content of the file, such as within Markdown. | 
markup | array of object([Markup definition](/docs/references/schemas/Markup definition)) | Optional. Markup definitions for the file type. | 

## Examples

```json
{
  "name": "example",
  "extends": "markdown",
  "inlineStatements": {},
  "markup": []
}
```
