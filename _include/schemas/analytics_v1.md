# analytics Schema

```txt
undefined
```

Perform a native shell command.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                   |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [analytics\_v1.schema.json](analytics_v1.schema.json "open original schema") |

## analytics Type

`object` ([analytics](analytics_v1.md))

## analytics Examples

```json
{
  "version": "0.1.8",
  "userId": "",
  "detailLevel": "action-detailed",
  "tests": {
    "numberTests": 0,
    "passed": 0,
    "failed": 0
  },
  "actions": {
    "numberActions": 0,
    "averageNumberActionsPerTest": 0,
    "maxActionsPerTest": 0,
    "minActionsPerTest": 0,
    "passed": 0,
    "failed": 0
  },
  "actionDetails": {
    "goTo": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "uri": 0
    },
    "find": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "wait": {
        "numberInstances": 0,
        "duration": 0
      },
      "matchText": {
        "numberInstances": 0,
        "text": 0
      },
      "moveMouse": {
        "numberInstances": 0,
        "alignH": 0,
        "alignV": 0,
        "offsetX": 0,
        "offsetY": 0
      },
      "click": {
        "numberInstances": 0
      },
      "type": {
        "numberInstances": 0,
        "keys": 0,
        "trailingSpecialKey": 0,
        "env": 0
      }
    },
    "matchText": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "css": 0,
      "text": 0
    },
    "click": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "css": 0
    },
    "type": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "css": 0,
      "keys": 0,
      "trailingSpecialKey": 0,
      "env": 0
    },
    "moveMouse": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "css": 0,
      "alignH": 0,
      "alignV": 0,
      "offsetX": 0,
      "offsetY": 0
    },
    "scroll": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "x": 0,
      "y": 0
    },
    "wait": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "duration": 0,
      "css": 0
    },
    "screenshot": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "mediaDirectory": 0,
      "filename": 0,
      "matchPrevious": 0,
      "matchThreshold": 0
    },
    "startRecording": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "mediaDirectory": 0,
      "filename": 0,
      "gifFps": 0,
      "gifWidth": 0
    },
    "stopRecording": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0
    },
    "checkLink": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "uri": 0,
      "statusCodes": 0
    },
    "runShell": {
      "numberInstances": 0,
      "passed": 0,
      "failed": 0,
      "command": 0,
      "env": 0
    }
  }
}
```

# analytics Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                  |
| :------------------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------ |
| [version](#version)             | `string` | Required | cannot be null | [analytics](analytics_v1-properties-version.md "undefined#/properties/version")             |
| [userId](#userid)               | `string` | Optional | cannot be null | [analytics](analytics_v1-properties-userid.md "undefined#/properties/userId")               |
| [detailLevel](#detaillevel)     | `string` | Required | cannot be null | [analytics](analytics_v1-properties-detaillevel.md "undefined#/properties/detailLevel")     |
| [tests](#tests)                 | `object` | Optional | cannot be null | [analytics](analytics_v1-properties-tests.md "undefined#/properties/tests")                 |
| [actions](#actions)             | `object` | Optional | cannot be null | [analytics](analytics_v1-properties-actions.md "undefined#/properties/actions")             |
| [actionDetails](#actiondetails) | `object` | Optional | cannot be null | [analytics](analytics_v1-properties-actiondetails.md "undefined#/properties/actionDetails") |

## version



`version`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [analytics](analytics_v1-properties-version.md "undefined#/properties/version")

### version Type

`string`

## userId



`userId`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [analytics](analytics_v1-properties-userid.md "undefined#/properties/userId")

### userId Type

`string`

## detailLevel



`detailLevel`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [analytics](analytics_v1-properties-detaillevel.md "undefined#/properties/detailLevel")

### detailLevel Type

`string`

### detailLevel Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value               | Explanation |
| :------------------ | :---------- |
| `"run"`             |             |
| `"tests"`           |             |
| `"action-simple"`   |             |
| `"action-detailed"` |             |

## tests



`tests`

*   is optional

*   Type: `object` ([Details](analytics_v1-properties-tests.md))

*   cannot be null

*   defined in: [analytics](analytics_v1-properties-tests.md "undefined#/properties/tests")

### tests Type

`object` ([Details](analytics_v1-properties-tests.md))

## actions



`actions`

*   is optional

*   Type: `object` ([Details](analytics_v1-properties-actions.md))

*   cannot be null

*   defined in: [analytics](analytics_v1-properties-actions.md "undefined#/properties/actions")

### actions Type

`object` ([Details](analytics_v1-properties-actions.md))

## actionDetails



`actionDetails`

*   is optional

*   Type: `object` ([Details](analytics_v1-properties-actiondetails.md))

*   cannot be null

*   defined in: [analytics](analytics_v1-properties-actiondetails.md "undefined#/properties/actionDetails")

### actionDetails Type

`object` ([Details](analytics_v1-properties-actiondetails.md))
