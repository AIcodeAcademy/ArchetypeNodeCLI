# Feature F5 - Command Management Test Prompt

### Reference

<!--
  {{ containerFolder: /containers/c0-node-cli }}
  {{ folderRules: {{containerFolder}}/.ai/}}
  -->

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Feature Documentation](/docs/f5-command-management.blueprint.md)
- [Archetype Node CLI](/containers/c0-node-cli/docs/node-cli.archetype.md)
- [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

## Prompt

You are to generate a comprehensive set of tests for the F5 Command Management feature as implemented in the current `src` folder. Follow these instructions:

1. **Read the following files for context and requirements:**
   - [Feature Blueprint](/docs/f5-command-management.blueprint.md)
   - [Implementation Plan](/containers/c0-node-cli/docs/f5/f5-command-management.plan.md) (if available)
   - [Relevant source files in `/src/system/command/`]
   - [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

2. **Test Scope:**
   - Cover all acceptance criteria and scenarios described in the feature blueprint.
   - Focus on the  modules from the `src/application` folder.
   - Test command system initialization and configuration
   - Test argument parsing functionality
   - Test option handling and validation
   - Test command execution flow
   - Test error handling and validation

3. **Test Naming:**
   - Write tests under the `test/f5` folder.
   - Name test files after the subject, e.g., `command.factory.test.ts`, `argument.parser.test.ts`, etc.
   - Use descriptive test case names following the test rules.

4. **Test Coverage:**
   - Test command system initialization:
     - Default configuration application
     - Custom configuration handling
     - Command registration
     - Error handling during initialization
   - Test argument parsing:
     - Positional argument parsing
     - Required argument validation
     - Optional argument handling
     - Argument type conversion
     - Invalid argument handling
   - Test option handling:
     - Flag options
     - Value options
     - Required options
     - Optional options
     - Option aliases
     - Invalid option handling
   - Test command execution:
     - Command routing
     - Argument passing
     - Option passing
     - Execution flow
     - Error handling
   - Test error handling:
     - Invalid command handling
     - Missing argument handling
     - Invalid option handling
     - Command execution errors
     - System resilience

5. **Test Structure:**
   - Follow the AAA pattern (Arrange, Act, Assert)
   - Use proper test doubles (mocks, spies, stubs) for command execution
   - Ensure each test case has a single assertion
   - Group related tests in describe blocks
   - Test command factory behavior
   - Test repository pattern implementation
   - Include cleanup in command registration tests
   - Test command isolation and independence

> End of prompt for F5 Command Management tests. 