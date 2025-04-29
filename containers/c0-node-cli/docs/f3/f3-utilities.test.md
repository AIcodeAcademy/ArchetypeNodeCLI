# Feature F3 - Utilities Test Prompt

### Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Feature Documentation](/docs/f3-utilities.blueprint.md)
- [Archetype Node CLI](/containers/c0-node-cli/docs/node-cli.archetype.md)
- [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

## Prompt

You are to generate a comprehensive set of tests for the F3 Utilities feature as implemented in the current `src` folder. Follow these instructions:

1. **Read the following files for context and requirements:**
   - [Feature Blueprint](/docs/f3-utilities.blueprint.md)
   - [Implementation Plan](/containers/c0-node-cli/docs/f3/f3-utilities.plan.md) (if available)
   - [Relevant source files in `/src/system/`]
   - [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

2. **Test Scope:**
   - Cover all acceptance criteria and scenarios described in the feature blueprint.
   - Focus on the following modules:
     - `fs.adapter.ts`
     - `json.utils.ts`
     - `style-text.adapter.ts`
   - Test file system operations (read, write, append)
   - Test JSON file operations with type safety
   - Test console text styling functionality
   - Validate error handling and edge cases

3. **Test Naming:**
   - Write tests under the `test/f3` folder.
   - Name test files after the subject, e.g., `fs.adapter.test.ts`, `json.utils.test.ts`, `style-text.adapter.test.ts`.
   - Use descriptive test case names following the test rules.

5. **Test Coverage:**
   - Test file system operations:
     - Reading files with different encodings
     - Writing files with proper error handling
     - Appending to existing files
     - Handling file not found scenarios
   - Test JSON utilities:
     - Reading JSON files with type validation
     - Writing JSON files with proper formatting
     - Handling invalid JSON data
     - Type safety checks
   - Test text styling:
     - Color application
     - Text modifiers
     - Style combinations
     - Invalid style handling

6. **Test Structure:**
   - Follow the AAA pattern (Arrange, Act, Assert)
   - Use proper test doubles (mocks, spies, stubs) where needed
   - Ensure each test case has a single assertion
   - Group related tests in describe blocks

> End of prompt for F3 Utilities tests. 