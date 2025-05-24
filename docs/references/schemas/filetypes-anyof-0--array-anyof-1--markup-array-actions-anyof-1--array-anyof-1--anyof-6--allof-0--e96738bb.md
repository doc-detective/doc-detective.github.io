
# fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[6]-allOf[0]-e96738bb



## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-744eaebc](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-744eaebc)

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
