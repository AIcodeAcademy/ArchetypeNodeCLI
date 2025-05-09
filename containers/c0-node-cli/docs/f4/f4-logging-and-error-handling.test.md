# Feature F4 - Logging and Error Handling Test Prompt

### Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Feature Documentation](/docs/f4-logging-and-error-handling.blueprint.md)
- [Archetype Node CLI](/containers/c0-node-cli/docs/node-cli.archetype.md)
- [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

## Prompt

You are to generate a comprehensive set of tests for the F4 Logging and Error Handling feature as implemented in the current `src` folder. Follow these instructions:

1. **Read the following files for context and requirements:**
   - [Feature Blueprint](/docs/f4-logging-and-error-handling.blueprint.md)
   - [Implementation Plan](/containers/c0-node-cli/docs/f4/f4-logging-and-error-handling.plan.md) (if available)
   - [Relevant source files in `/src/system/log`]
   - [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

2. **Test Scope:**
   - Cover all acceptance criteria and scenarios described in the feature blueprint.
   - Focus on the following modules:
     - `log.singleton.ts`
     - `transport.factory.ts`
     - `transport-console.repository.ts`
     - `transport-file.repository.ts`
     - `log-config.type.ts`
     - `log-level.type.ts`
     - `formatter.factory.ts`
   - Test logging system initialization and configuration
   - Test different log levels and message routing
   - Test transport functionality and error handling
   - Test formatter implementations
   - Validate singleton pattern implementation

3. **Test Naming:**
   - Write tests under the `test/f4` folder.
   - Name test files after the subject, e.g., `log.singleton.test.ts`, `transport.factory.test.ts`, etc.
   - Use descriptive test case names following the test rules.

4. **Test Coverage:**
   - Test logging system initialization:
     - Default configuration application
     - Custom configuration handling
     - Transport initialization
     - Error handling during initialization
   - Test log levels:
     - Debug level logging
     - Info level logging
     - Warn level logging
     - Error level logging
     - Level filtering
   - Test transports:
     - Console transport functionality
     - File transport operations
     - Transport error handling
     - Multiple transport coordination
   - Test formatters:
     - CSV formatting
     - JSON formatting
     - Pretty formatting
     - Timestamp inclusion
     - Custom formatting options
   - Test error handling:
     - Transport failures
     - Configuration errors
     - Formatting errors
     - System resilience

5. **Test Structure:**
   - Follow the AAA pattern (Arrange, Act, Assert)
   - Use proper test doubles (mocks, spies, stubs) for transports
   - Ensure each test case has a single assertion
   - Group related tests in describe blocks
   - Test singleton behavior appropriately
   - Include cleanup in file-based tests

> End of prompt for F4 Logging and Error Handling tests. 