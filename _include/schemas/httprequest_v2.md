# httpRequest Schema

```txt
undefined
```

Perform a generic HTTP request, for example to an API.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [httpRequest\_v2.schema.json](httpRequest_v2.schema.json "open original schema") |

## httpRequest Type

`object` ([httpRequest](httprequest_v2.md))

## httpRequest Examples

```json
{
  "action": "httpRequest",
  "url": "https://reqres.in/api/users"
}
```

```json
{
  "action": "httpRequest",
  "url": "https://reqres.in/api/users/2",
  "method": "put",
  "requestData": {
    "name": "morpheus",
    "job": "zion resident"
  }
}
```

```json
{
  "action": "httpRequest",
  "url": "https://reqres.in/api/users",
  "method": "post",
  "requestData": {
    "name": "morpheus",
    "job": "leader"
  },
  "responseData": {
    "name": "morpheus",
    "job": "leader"
  },
  "statusCodes": [
    200,
    201
  ]
}
```

```json
{
  "action": "httpRequest",
  "url": "https://www.api-server.com",
  "method": "post",
  "requestHeaders": {
    "header": "value"
  },
  "requestParams": {
    "param": "value"
  },
  "requestData": {
    "field": "value"
  },
  "responseHeaders": {
    "header": "value"
  },
  "responseData": {
    "field": "value"
  },
  "statusCodes": [
    200
  ]
}
```

# httpRequest Properties

| Property                                      | Type     | Required | Nullable       | Defined by                                                                                                    |
| :-------------------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------ |
| [id](#id)                                     | `string` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-id.md "undefined#/properties/id")                                     |
| [description](#description)                   | `string` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-description.md "undefined#/properties/description")                   |
| [action](#action)                             | `string` | Required | cannot be null | [httpRequest](httprequest_v2-properties-action.md "undefined#/properties/action")                             |
| [url](#url)                                   | `string` | Required | cannot be null | [httpRequest](httprequest_v2-properties-url.md "undefined#/properties/url")                                   |
| [statusCodes](#statuscodes)                   | `array`  | Optional | cannot be null | [httpRequest](httprequest_v2-properties-statuscodes.md "undefined#/properties/statusCodes")                   |
| [method](#method)                             | `string` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-method.md "undefined#/properties/method")                             |
| [requestHeaders](#requestheaders)             | `object` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-requestheaders.md "undefined#/properties/requestHeaders")             |
| [responseHeaders](#responseheaders)           | `object` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-responseheaders.md "undefined#/properties/responseHeaders")           |
| [requestParams](#requestparams)               | `object` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-requestparams.md "undefined#/properties/requestParams")               |
| [responseParams](#responseparams)             | `object` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-responseparams.md "undefined#/properties/responseParams")             |
| [requestData](#requestdata)                   | `object` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-requestdata.md "undefined#/properties/requestData")                   |
| [responseData](#responsedata)                 | `object` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-responsedata.md "undefined#/properties/responseData")                 |
| [envsFromResponseData](#envsfromresponsedata) | `array`  | Optional | cannot be null | [httpRequest](httprequest_v2-properties-envsfromresponsedata.md "undefined#/properties/envsFromResponseData") |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

Aciton to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"httpRequest"
```

## url

URL for the HTTP request.

`url`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-url.md "undefined#/properties/url")

### url Type

`string`

### url Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^(http://|https://).*
```

[try pattern](https://regexr.com/?expression=%5E\(http%3A%2F%2F%7Chttps%3A%2F%2F\).* "try regular expression with regexr.com")

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

## statusCodes



`statusCodes`

*   is optional

*   Type: an array of merged types ([Details](httprequest_v2-properties-statuscodes-items.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-statuscodes.md "undefined#/properties/statusCodes")

### statusCodes Type

an array of merged types ([Details](httprequest_v2-properties-statuscodes-items.md))

### statusCodes Default Value

The default value is:

```json
[
  200
]
```

## method

Method of the HTTP request

`method`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-method.md "undefined#/properties/method")

### method Type

`string`

### method Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"get"`    |             |
| `"put"`    |             |
| `"post"`   |             |
| `"patch"`  |             |
| `"delete"` |             |

### method Default Value

The default value is:

```json
"get"
```

## requestHeaders

Headers to include in the HTTP request, in key/value format.

`requestHeaders`

*   is optional

*   Type: `object` ([Details](httprequest_v2-properties-requestheaders.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-requestheaders.md "undefined#/properties/requestHeaders")

### requestHeaders Type

`object` ([Details](httprequest_v2-properties-requestheaders.md))

### requestHeaders Default Value

The default value is:

```json
{}
```

## responseHeaders

Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the step fails.

`responseHeaders`

*   is optional

*   Type: `object` ([Details](httprequest_v2-properties-responseheaders.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-responseheaders.md "undefined#/properties/responseHeaders")

### responseHeaders Type

`object` ([Details](httprequest_v2-properties-responseheaders.md))

### responseHeaders Default Value

The default value is:

```json
{}
```

## requestParams

URL parameters to include in the HTTP request, in key/value format.

`requestParams`

*   is optional

*   Type: `object` ([Details](httprequest_v2-properties-requestparams.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-requestparams.md "undefined#/properties/requestParams")

### requestParams Type

`object` ([Details](httprequest_v2-properties-requestparams.md))

### requestParams Default Value

The default value is:

```json
{}
```

## responseParams

URL parameters expected in the response, in key/value format. If one or more `responseParams` entries aren't present in the response, the step fails.

`responseParams`

*   is optional

*   Type: `object` ([Details](httprequest_v2-properties-responseparams.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-responseparams.md "undefined#/properties/responseParams")

### responseParams Type

`object` ([Details](httprequest_v2-properties-responseparams.md))

### responseParams Default Value

The default value is:

```json
{}
```

## requestData

JSON object to include as the body of the HTTP request.

`requestData`

*   is optional

*   Type: `object` ([Details](httprequest_v2-properties-requestdata.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-requestdata.md "undefined#/properties/requestData")

### requestData Type

`object` ([Details](httprequest_v2-properties-requestdata.md))

### requestData Default Value

The default value is:

```json
{}
```

## responseData

JSON object expected in the response. If one or more key/value pairs aren't present in the response, the step fails.

`responseData`

*   is optional

*   Type: `object` ([Details](httprequest_v2-properties-responsedata.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-responsedata.md "undefined#/properties/responseData")

### responseData Type

`object` ([Details](httprequest_v2-properties-responsedata.md))

### responseData Default Value

The default value is:

```json
{}
```

## envsFromResponseData

Environment variables to set based on response variables, as an object of the environment variable name and the jq filter applied to the response data to identify the variable's value.

`envsFromResponseData`

*   is optional

*   Type: an array of merged types ([Details](httprequest_v2-properties-envsfromresponsedata-items.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-envsfromresponsedata.md "undefined#/properties/envsFromResponseData")

### envsFromResponseData Type

an array of merged types ([Details](httprequest_v2-properties-envsfromresponsedata-items.md))

### envsFromResponseData Default Value

The default value is:

```json
[]
```
