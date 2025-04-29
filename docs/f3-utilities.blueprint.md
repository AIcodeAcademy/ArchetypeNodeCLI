# Feature F3 - Utilities

### Reference

- [Briefing Blueprint](./briefing.blueprint.md)

## Description

A collection of utility modules that wrap and adapt external or built-in Node.js frameworks and dependencies, providing a consistent and type-safe interface for common operations like file system access, JSON handling, and text styling.

## Goal / User Story

- **As a:** Node.js developer
- **I want to:** use standardized utility modules for common operations
- **So that:** I can maintain consistency and type safety across the application

## Acceptance Criteria / Scenarios

```gherkin
Scenario: Read and write JSON files
    Given I have a JSON file
    When I use the JSON utilities
    Then I can read and write the file with type safety
    And the operations are properly handled with error management

Scenario: File system operations
    Given I need to perform file operations
    When I use the file system adapter
    Then I can read, write, and append to files
    And the operations are consistent across the application

Scenario: Text styling in console
    Given I need to style console output
    When I use the text styling adapter
    Then I can apply colors and modifiers to text
    And the styling is consistent across the application
```

## UI/UX

- Utility modules with:
  - Consistent interfaces
  - Type safety
  - Clear documentation
  - Error handling
  - Example usage

## Additional Information

### Dependencies
- Node.js built-in modules
- TypeScript type system
- File system operations
- JSON parsing and stringifying
- Console text styling

### Preconditions
- Node.js environment
- TypeScript configuration
- Access to file system
- Console output capability

## Implementation Details

List of implementation plans for each container:
- [ArchetypeNodeCLI Implementation Plan](/containers/archetype-node-cli/docs/f3-utilities.plan.md)

### Current Implementation Structure
1. File System Utilities
   - `fs.adapter.ts`: Wraps Node.js fs module
   - Provides consistent interface for file operations
   - Handles encoding and error cases

2. JSON Utilities
   - `json.utils.ts`: Handles JSON file operations
   - Type-safe reading and writing
   - Integration with file system adapter

3. Text Styling
   - `style-text.adapter.ts`: Console text styling
   - Color and modifier support
   - Type-safe styling options

### Utility Patterns
- Adapter pattern for external dependencies
- Type-safe interfaces
- Consistent error handling
- Clear documentation
- Example usage in comments

> End of Feature Documentation for `f3-utilities` 