# Test rules

- We will use `node:test` for testing, without any external libraries.
- Test will be written in TypeScript at the `/test` directory (sibling of `/src`).
- The script `npm test` should run the all the tests in the `/test` directory.

## Test Structure
- Each test file should contain a single test suite tagged by a `describe` function.
- Each test suite should contain multiple test cases tagged by an `it` function.
- Each test case should contain a single assertion tagged by an `assert` function.
- Follo the AAA pattern:
  - Arrange: Prepare the necessary preconditions and inputs.
  - Act: Execute the function or method under test.
  - Assert: Verify that the action taken has the expected outcome.


## Test Naming
- Create a folder for each feature you are testing in the `/test` directory.
- Test files should be named with the pattern `*.test.ts`.  
- The subject of the test should be named `subName`
- Doubles should be prefixed with `mockName`, `spyName` or `stubName`.