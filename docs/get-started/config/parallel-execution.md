---
sidebar_position: 4
---

# Parallel Execution

Doc Detective supports parallel execution of test contexts using a configurable worker pool pattern. This feature can significantly improve performance for test suites with multiple contexts by running them concurrently instead of sequentially.

## How It Works

By default, Doc Detective executes test contexts sequentially (one after another). With parallel execution enabled, Doc Detective creates multiple worker processes that can execute different test contexts simultaneously while maintaining proper test isolation.

Each test context gets its own independent browser driver instance and execution environment, ensuring that tests don't interfere with each other even when running in parallel.

## Configuration

Enable parallel execution by setting the `concurrentRunners` field in your configuration:

```json
{
  "input": "./tests",
  "concurrentRunners": 4
}
```

### Configuration Options

- **`concurrentRunners`**: Number of concurrent workers to use
  - Default: `1` (sequential execution)
  - Recommended: 2-4 workers for most systems
  - Maximum: Limited by your system's resources

## Performance Benefits

Parallel execution can provide significant performance improvements:

- **2 workers**: Typically 1.5-1.7x speedup
- **4 workers**: Typically 2-2.5x speedup
- **Higher worker counts**: Diminishing returns due to system overhead

The actual speedup depends on:
- Number of test contexts in your test suite
- System resources (CPU, memory)
- Test complexity and duration
- Browser startup overhead

## Best Practices

### Choosing Worker Count

- **Start with 2-4 workers** for most systems
- **Monitor system resources** when increasing worker count
- **Consider test suite size**: More workers than contexts provides no benefit
- **Test different configurations** to find optimal performance

### Test Design Considerations

- **Ensure test isolation**: Tests should not depend on shared state
- **Avoid resource conflicts**: Tests shouldn't compete for the same files or ports
- **Use unique identifiers**: Generate unique test data to prevent conflicts

### System Requirements

- **Memory**: Each worker requires additional memory for browser instances
- **CPU**: Multiple workers benefit from multi-core processors
- **Browser resources**: Each context gets its own browser driver

## Examples

### Basic Parallel Configuration

```json
{
  "input": "./tests",
  "concurrentRunners": 2,
  "logLevel": "info"
}
```

### Advanced Configuration with Multiple Contexts

```json
{
  "input": "./tests",
  "concurrentRunners": 4,
  "runOn": [
    {
      "platform": "linux",
      "browser": "chrome"
    },
    {
      "platform": "linux", 
      "browser": "firefox"
    }
  ]
}
```

### Command Line Override

You can override the configuration from the command line:

```bash
npx doc-detective --config .doc-detective.json --concurrentRunners 3
```

## Troubleshooting

### Performance Issues

- **Reduce worker count** if system becomes unresponsive
- **Monitor memory usage** - each worker uses additional RAM
- **Check for resource contention** between parallel tests

### Test Failures

- **Verify test isolation** - ensure tests don't share state
- **Check for timing issues** - parallel execution may expose race conditions
- **Review error logs** - failed contexts are reported with detailed error information

### Browser Issues

- **Ensure sufficient browser resources** for multiple instances
- **Consider headless mode** to reduce resource usage
- **Check browser driver compatibility** with parallel execution

## Migration from Sequential Execution

Existing test suites work unchanged with parallel execution:

1. **No breaking changes** - all existing tests continue to work
2. **Gradual adoption** - start with `concurrentRunners: 2`
3. **Monitor results** - verify test outcomes remain consistent
4. **Optimize incrementally** - increase worker count based on performance gains

## Error Handling

Parallel execution maintains robust error handling:

- **Isolated failures**: Error in one context doesn't terminate others
- **Complete results**: All test results are collected regardless of execution order
- **Detailed reporting**: Failed contexts include full error details
- **Graceful cleanup**: Resources are properly cleaned up even on failures