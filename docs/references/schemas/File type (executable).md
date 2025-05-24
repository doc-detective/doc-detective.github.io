
# File type (executable)



## Referenced In

- [config](/docs/references/schemas/config)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
extensions | one of:<br/>- string<br/>- array of string | Required. File extensions to use with type. | 
runShell | one of:<br/>- string<br/>- object([Run shell command (detailed)](/docs/references/schemas/Run%20shell%20command%20(detailed))) | Optional. `runShell` step to perform for this file type. Use $1 as a placeholder for the file path. | 

## Examples
