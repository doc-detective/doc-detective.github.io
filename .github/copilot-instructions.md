# GitHub Copilot Instructions for Doc Detective Resolver

## Project Overview

Doc Detective Resolver is a Node.js package that detects and resolves documentation into Doc Detective tests. It's part of the larger Doc Detective ecosystem, which enables automated testing of documentation by parsing embedded test specifications from various file formats.

## Key Concepts

### Core Purpose
- **Detection**: Parse documentation files to find embedded test specifications
- **Resolution**: Process and standardize detected tests into executable format
- **Integration**: Support for OpenAPI/Arazzo specifications and various markup formats

### Test Specifications
Tests are embedded in documentation using specific syntax patterns:
- HTML comments: `<!-- test ... -->`, `<!-- step ... -->`
- Markdown YAML blocks: Code blocks with test specifications
- JavaScript comments: `// (test ...)`, `// (step ...)`

### File Types Supported
- Markdown (`.md`, `.markdown`)
- HTML (`.html`, `.htm`)
- JavaScript/TypeScript (`.js`, `.ts`)
- Other text-based formats via configuration

## Code Structure

### Main Modules
- `src/index.js` - Main entry point with primary API functions
- `src/config.js` - Configuration management and validation
- `src/utils.js` - Core parsing and processing utilities
- `src/resolve.js` - Test resolution and context handling
- `src/openapi.js` - OpenAPI specification handling
- `src/arazzo.js` - Arazzo workflow specification support

### Key Functions
- `detectAndResolveTests({ config })` - Complete workflow: detect and resolve
- `detectTests({ config })` - Parse files and extract test specifications
- `resolveTests({ config, detectedTests })` - Process detected tests for execution

### Configuration System
- Uses `doc-detective-common` for schema validation
- Supports environment variable overrides via `DOC_DETECTIVE`
- Deep merging of configuration objects
- File type definitions with regex patterns for test detection

## Development Patterns

### Test Syntax Recognition
The resolver uses regex patterns to identify test constructs:
```javascript
// Test start patterns
testStart: ["<!-- test ([\\s\\S]*?) -->"]
// Step patterns  
step: ["<!-- step ([\\s\\S]*?) -->"]
```

### Schema Transformation
- Supports migration from v2 to v3 test schemas
- Uses `transformToSchemaKey` for version compatibility
- Temporary steps added during validation, then removed

### Error Handling
- Comprehensive logging via `log()` utility
- Configuration validation with detailed error messages
- Graceful handling of malformed test specifications

### Testing Conventions
- Use Mocha for unit tests
- Chai for assertions
- Test files follow `*.test.js` naming pattern

## API Usage Patterns

### Basic Detection
```javascript
const { detectTests } = require("doc-detective-resolver");
const detectedTests = await detectTests({ config });
```

### Full Resolution
```javascript
const { detectAndResolveTests } = require("doc-detective-resolver");
const resolvedTests = await detectAndResolveTests({ config });
```

### Step-by-Step Processing
```javascript
const { detectTests, resolveTests } = require("doc-detective-resolver");
const detectedTests = await detectTests({ config });
const resolvedTests = await resolveTests({ config, detectedTests });
```

## Integration Points

### OpenAPI Support
- Loads OpenAPI specifications for HTTP request validation
- Supports operation ID references in test steps
- Handles parameter substitution and request/response validation

### Context Resolution
- Browser context handling for web-based tests
- Driver requirements detection (click, find, goTo, etc.)
- Platform-specific configurations

### Variable Substitution
- Numeric variable replacement (`$1`, `$2`, etc.)
- Response body references (`$$response.body.field`)
- Environment variable support

## Best Practices

### When Adding New Features
- Follow existing regex patterns for markup detection
- Maintain backward compatibility with existing schemas
- Add comprehensive test coverage
- Update configuration schema validation

### Code Style
- Use async/await for asynchronous operations
- Prefer destructuring for function parameters
- Use meaningful variable names that reflect Doc Detective terminology
- Add JSDoc comments for complex functions

### Testing Guidelines
- When possible, directly import and run functions rather than use extensive mocking and stubbing
- Mock external dependencies (file system, HTTP requests)
- Test both successful and error scenarios
- Validate configuration handling thoroughly
- Use realistic test data that matches actual usage patterns

## Debugging Tips

### Common Issues
- Invalid regex patterns in file type configurations
- Schema validation failures during test resolution
- Missing or incorrect OpenAPI specification references
- File path resolution problems in different environments

### Logging
Use the built-in logging system:
```javascript
log(config, "info", "Your message here");
```

Available log levels: `debug`, `info`, `warn`, `error`