# httpRequest Schema

```txt
undefined
```

Perform a generic HTTP request, for example to a REST API.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [httpRequest\_v1.schema.json](httpRequest_v1.schema.json "open original schema") |

## httpRequest Type

`object` ([httpRequest](httprequest_v1.md))

## httpRequest Examples

```json
{
  "action": "httpRequest",
  "uri": "https://www.api-server.com",
  "method": "post"
}
```

```json
{
  "action": "httpRequest",
  "env": "path/to/variables.env",
  "uri": "https://www.api-server.com",
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

| Property                            | Type     | Required | Nullable       | Defined by                                                                                          |
| :---------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| [action](#action)                   | `string` | Required | cannot be null | [httpRequest](httprequest_v1-properties-action.md "undefined#/properties/action")                   |
| [uri](#uri)                         | `string` | Required | cannot be null | [httpRequest](httprequest_v1-properties-uri.md "undefined#/properties/uri")                         |
| [statusCodes](#statuscodes)         | `array`  | Optional | cannot be null | [httpRequest](httprequest_v1-properties-statuscodes.md "undefined#/properties/statusCodes")         |
| [env](#env)                         | `string` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-env.md "undefined#/properties/env")                         |
| [method](#method)                   | `string` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-method.md "undefined#/properties/method")                   |
| [requestHeaders](#requestheaders)   | `object` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-requestheaders.md "undefined#/properties/requestHeaders")   |
| [responseHeaders](#responseheaders) | `object` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-responseheaders.md "undefined#/properties/responseHeaders") |
| [requestParams](#requestparams)     | `object` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-requestparams.md "undefined#/properties/requestParams")     |
| [responseParams](#responseparams)   | `object` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-responseparams.md "undefined#/properties/responseParams")   |
| [requestData](#requestdata)         | `object` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-requestdata.md "undefined#/properties/requestData")         |
| [responseData](#responsedata)       | `object` | Optional | cannot be null | [httpRequest](httprequest_v1-properties-responsedata.md "undefined#/properties/responseData")       |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"httpRequest"
```

## uri

The URI for the HTTP request.

`uri`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-uri.md "undefined#/properties/uri")

### uri Type

`string`

## statusCodes



`statusCodes`

*   is optional

*   Type: `integer[]`

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-statuscodes.md "undefined#/properties/statusCodes")

### statusCodes Type

`integer[]`

### statusCodes Default Value

The default value is:

```json
[
  200
]
```

## env



`env`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-env.md "undefined#/properties/env")

### env Type

`string`

## method

Method of the HTTP request

`method`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-method.md "undefined#/properties/method")

### method Type

`string`

### method Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"get"`    |             |
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

*   Type: `object` ([Details](httprequest_v1-properties-requestheaders.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-requestheaders.md "undefined#/properties/requestHeaders")

### requestHeaders Type

`object` ([Details](httprequest_v1-properties-requestheaders.md))

### requestHeaders Constraints

**minimum number of properties**: the minimum number of properties for this object is: `1`

## responseHeaders

Headers expected in the response, in key/value format. If one or more `responseHeaders` entries aren't present in the response, the action fails.

`responseHeaders`

*   is optional

*   Type: `object` ([Details](httprequest_v1-properties-responseheaders.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-responseheaders.md "undefined#/properties/responseHeaders")

### responseHeaders Type

`object` ([Details](httprequest_v1-properties-responseheaders.md))

### responseHeaders Constraints

**minimum number of properties**: the minimum number of properties for this object is: `1`

## requestParams

URL parameters to include in the HTTP request, in key/value format.

`requestParams`

*   is optional

*   Type: `object` ([Details](httprequest_v1-properties-requestparams.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-requestparams.md "undefined#/properties/requestParams")

### requestParams Type

`object` ([Details](httprequest_v1-properties-requestparams.md))

### requestParams Constraints

**minimum number of properties**: the minimum number of properties for this object is: `1`

## responseParams

URL parameters expected in the response, in key/value format. If one or more `responseParams` entries aren't present in the response, the action fails.

`responseParams`

*   is optional

*   Type: `object` ([Details](httprequest_v1-properties-responseparams.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-responseparams.md "undefined#/properties/responseParams")

### responseParams Type

`object` ([Details](httprequest_v1-properties-responseparams.md))

### responseParams Constraints

**minimum number of properties**: the minimum number of properties for this object is: `1`

## requestData



`requestData`

*   is optional

*   Type: `object` ([Details](httprequest_v1-properties-requestdata.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-requestdata.md "undefined#/properties/requestData")

### requestData Type

`object` ([Details](httprequest_v1-properties-requestdata.md))

### requestData Constraints

**minimum number of properties**: the minimum number of properties for this object is: `1`

## responseData



`responseData`

*   is optional

*   Type: `object` ([Details](httprequest_v1-properties-responsedata.md))

*   cannot be null

*   defined in: [httpRequest](httprequest_v1-properties-responsedata.md "undefined#/properties/responseData")

### responseData Type

`object` ([Details](httprequest_v1-properties-responsedata.md))

### responseData Constraints

**minimum number of properties**: the minimum number of properties for this object is: `1`
