
# Common



## Referenced In

- [Markup definition](/docs/references/schemas/Markup%20definition)
- [test](/docs/references/schemas/test)
- [Resolved context](/docs/references/schemas/Resolved%20context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
stepId | string | Optional. ID of the step. | 
description | string | Optional. Description of the step. | 
outputs | object(Outputs (step)) | Optional. Outputs from step processes and user-defined expressions. Use the `outputs` object to reference outputs in subsequent steps. If a user-defined output matches the key for a step-defined output, the user-defined output takes precedence. | ``{}``
variables | object(Variables (step)) | Optional. Environment variables to set from user-defined expressions. | ``{}``

## Examples

```json
{
  "stepId": "example",
  "description": "example",
  "outputs": {},
  "variables": {}
}
```
