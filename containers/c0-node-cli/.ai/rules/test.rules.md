# Test rules

- We will use `node:test` for testing, without any external libraries.
- Test will be written in TypeScript at the `/test` directory (sibling of `/src`).
- Source code is imported with relative full paths, ending in `.ts`.
- The script `npm test` should run the all the tests in the `/test` directory.
- Do not change the source code to make the tests pass.

## Test Structure
- Follow the Gherkin syntax for writing tests.
 - **Given** a specific context in a main `describe` block
 - **When** a specific action is taken in a nested `describe` block or a `beforeEach` block
 - **Then** a specific outcome is observed in `test` block
- Follow the AAA pattern:
  - **Arrange**: Prepare the necessary preconditions and inputs.
  - **Act**: Execute the function or method under test.
  - **Assert**: Verify that the action taken has the expected outcome.

### Comments

- Use JSDoc comments with gherkin syntax at each main `describe` block.
- Use comments each AAA pattern step.

## Test Naming
- Create a folder for each feature you are testing in the `/test` directory.
- Test files should be named with the pattern `*.test.ts`.  
- Doubles should be suffixed with `Spy`, `Mock` or `Stub`.