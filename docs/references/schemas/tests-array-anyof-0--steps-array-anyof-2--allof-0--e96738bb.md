
# tests-array-anyOf[0]-steps-array-anyOf[2]-allOf[0]-e96738bb



## Referenced In

- [test](/docs/references/schemas/test)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
stepId | string | Optional. ID of the step. | 
description | string | Optional. Description of the step. | 
outputs | object | Optional. Outputs from step processes and user-defined expressions. Use the `outputs` object to reference outputs in subsequent steps. If a user-defined output matches the key for a step-defined output, the user-defined output takes precedence. | ``{}``
variables | object | Optional. Environment variables to set from user-defined expressions. | ``{}``

## Examples

```json
{
  "stepId": "example",
  "description": "example",
  "outputs": {},
  "variables": {}
}
```
