
# Integrations options

Options for connecting to external services.

## Referenced In

- [config](/docs/references/schemas/config)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
openApi | array of unknown | Optional. No description provided. | 
docDetectiveApi | object | Optional. Configure Doc Detective to run tests via the Doc Detective API instead of locally. When an API key is provided, tests are executed on remote infrastructure. | 
docDetectiveApi.apiKey | string | Required (if docDetectiveApi is used). API key for authenticating with the Doc Detective API. | 

## Examples

```json
{
  "openApi": []
}
```

```json
{
  "docDetectiveApi": {
    "apiKey": "your-api-key-here"
  }
}
```
