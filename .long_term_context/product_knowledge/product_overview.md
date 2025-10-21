Doc Detective is a comprehensive documentation testing framework designed to validate the accuracy and functionality of technical documentation through automated testing. The framework executes tests directly against web applications, APIs, and command-line interfaces using JSON-based test specifications, ensuring documentation remains current and functional as products evolve.

## Product Relationships and Features

The Doc Detective ecosystem operates through a hierarchical architecture of **test specifications**, **tests**, **steps**, and **actions**. Test specifications function as containers for multiple tests, each targeting specific functionality or user workflows. Within tests, steps define sequential operations using an extensive action library spanning web automation, API testing, file operations, and multimedia capture.

The action system forms the core execution engine with interconnected capabilities:

**Web Automation Actions** (`goTo`, `find`, `click`, `dragAndDrop`, `type`) collaborate to simulate complete user journeys. The `find` action locates elements using CSS selectors, XPath, or display text, enabling subsequent `click` interactions, `dragAndDrop` operations for complex UI manipulation, and `type` actions for form input with support for special keys and modifier combinations.

**HTTP Testing Actions** (`checkLink`, `httpRequest`) provide dual-layer web validation. The `checkLink` action performs URL accessibility verification, while `httpRequest` delivers comprehensive API testing with OpenAPI integration, custom headers, request bodies, and response validation.

**State Management Actions** (`loadVariables`, `loadCookie`, `saveCookie`) enable persistent test data across executions. Variables loaded through `loadVariables` support interpolation syntax (`$$variable.name`) throughout all actions, while cookie management maintains session state between test runs.

**Documentation Actions** (`screenshot`, `record`, `stopRecord`) create multimedia test artifacts. Screenshots support visual regression testing with configurable variation thresholds, while video recording captures complete test sessions for debugging and documentation purposes.

**Code Execution Actions** (`runCode`, `runShell`) extend testing beyond web interfaces to local system operations, supporting JavaScript, Python, and shell command execution with output capture and validation.

## Key Nomenclature and Definitions

**Test Specification**: Top-level JSON document containing metadata and test arrays, following a defined schema for validation and execution.

**Context**: Configuration object specifying target applications and platforms, enabling cross-environment test execution with platform-specific optimizations.

**Actions**: Individual commands within test steps, configurable in string shorthand (`"goTo": "https://example.com"`), array format for multiple targets, or object format for complex parameter specification.

**Element Targeting**: Multi-method element location system supporting:
- `selector`: CSS or XPath expressions for precise targeting
- `elementText`: Display text matching for user-centric element identification
- Combined criteria for robust element location

**Variable Interpolation**: Dynamic value system using expressions like `$$response.body`, `$$stdio.stdout`, and `$$exitCode` for capturing and reusing data across test execution.

**Origin Resolution**: URL handling system supporting absolute URLs, relative paths with `origin` parameter specification, and global origin configuration for consistent base URL management.

**Wait Conditions**: Flexible timing system with `wait` actions supporting element appearance, disappearance, custom durations, and automatic timeout handling for robust test execution.

## Broader Product Ecosystem Integration

Doc Detective integrates extensively with development and testing ecosystems:

**OpenAPI Integration**: The `httpRequest` action supports `operationId`, `descriptionPath`, `useExample`, and `exampleKey` properties, enabling contract testing and specification-driven validation workflows.

**CI/CD Pipeline Support**: Environment variable loading, certificate handling (including `NODE_TLS_REJECT_UNAUTHORIZED` for development environments), and JSON output formatting enable seamless continuous integration workflows.

**Multi-Browser Compatibility**: Actions are designed for cross-browser execution with specific optimizations for Chromium-based browsers, supporting headless and headed execution modes.

**File System Integration**: Comprehensive file handling with support for relative/absolute paths, directory creation, overwrite protection, and multiple output formats (PNG, MP4, WebM, GIF, JSON, text).

**Development Tool Integration**: The framework provides an Action Builder prototype for interactive test creation, schema documentation for IDE integration, and GitHub-based community support through issue tracking and contribution workflows.

## Command Line Interface and Execution

The primary execution interface uses `npx doc-detective` with flexible argument handling:

**Core Execution**: `npx doc-detective` runs tests using default configuration discovery
**Input Specification**: `--input sample.spec.json` or `--input file1.json,file2.md` for multiple file execution
**Configuration Override**: `--config custom-config.json` for environment-specific settings
**Directory-based Execution**: Automatic `.doc-detective.json` configuration file discovery in working directories

**HTTP Methods**: The `httpRequest` action supports all standard HTTP verbs with comprehensive parameter handling including headers, query parameters, request bodies, and response validation.

**Shell Integration**: Platform-aware command execution through `runShell` with automatic shell detection (cmd on Windows, bash on Unix-like systems) and argument array processing.

**Special Key Simulation**: The `type` action provides extensive keyboard automation including `$ENTER$`, `$TAB$`, arrow keys, function keys (F1-F12), numpad keys, and modifier combinations for comprehensive input simulation.

The framework outputs structured JSON results with PASS/FAIL status, execution timing, error details, and captured artifacts, enabling integration with reporting systems and automated quality gates.