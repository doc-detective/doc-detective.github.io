

  # httpRequest

The `httpRequest` action makes arbitrary HTTP calls, allowing you to call and validate APIs and use web services.

> For comprehensive options, see the [`httpRequest`](/docs/references/schemas/httpRequest) reference.

## Using OpenAPI with httpRequest

The `httpRequest` action can be enhanced by using an OpenAPI specification. This allows you to leverage existing API documentation to simplify your test creation and ensure your tests align with the API's defined structure.

### Why use OpenAPI with httpRequest?

1. **Consistency**: Ensures your tests align with the official API specification.
2. **Simplification**: Reduces the amount of manual configuration needed for API calls.
3. **Validation**: Automatically validates requests and responses against the API schema.
4. **Mocking**: Allows for testing against mock responses based on the API specification.

### How to use OpenAPI with httpRequest

To use OpenAPI with `httpRequest`, include an `openApi` object in your action configuration. Here's an example:

```json
{
  "action": "httpRequest",
  "method": "GET",
  "url": "https://api.example.com/pets/{petId}",
  "openApi": {
    "name": "PetStore",
    "descriptionPath": "https://petstore.swagger.io/v2/swagger.json",
    "operationId": "getPetById",
    "validateAgainstSchema": "both",
    "useExample": "both",
    "exampleKey": "examplePet"
  }
}
```

### Key OpenAPI properties

- `name`: Name of the OpenAPI definition as defined in your configuration.
- `descriptionPath`: URL or local path to the OpenAPI definition.
- `operationId`: ID of the operation to use for the request.
- `validateAgainstSchema`: Validates the request and/or response against the schema in the OpenAPI definition.
- `useExample`: Uses examples from the OpenAPI definition for request and/or response data.
- `exampleKey`: Specifies which example to use if multiple are available.
- `mockResponse`: If true, uses the response example or schema from the OpenAPI definition instead of making an actual HTTP request.

### Benefits of using OpenAPI with httpRequest

1. **Automatic validation**: The `validateAgainstSchema` property ensures your requests and responses conform to the API specification.
2. **Example usage**: The `useExample` property allows you to quickly set up tests using predefined examples from the API documentation.
3. **Mocking**: The `mockResponse` property enables testing against mock responses, useful for APIs that aren't fully implemented or for testing edge cases.
4. **Simplified configuration**: Many details of the API call can be inferred from the OpenAPI specification, reducing the need for manual configuration.

By integrating OpenAPI with `httpRequest`, you can create more robust, accurate, and maintainable API tests that align closely with the official API documentation.

  