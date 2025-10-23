
# Integrations options

Options for connecting to external services.

## Referenced In

- [config](/docs/references/schemas/config)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
openApi | array of [openApi](/docs/references/schemas/openApi) | Optional. OpenAPI definitions to load. These are automatically made available in test contexts, letting `httpRequest` actions reference them by `operationId` or `name`. See the [openApi](/docs/references/schemas/openApi) schema for details. | 

## Examples

```json
{
  "openApi": []
}
```
