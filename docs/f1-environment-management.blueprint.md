# Feature F1 - Environment Management

### Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)

## Description

Manage environment variables for different deployment stages (e.g., development, production).

## Goal / User Story

- **As a:** Developer using the CLI archetype
- **I want to:** Load environment-specific variables easily
- **So that:** My application behaves correctly in different deployment environments (dev, prod, etc.).

## Acceptance Criteria / Scenarios

```gherkin
Scenario: Load development environment variables
    Given a `.env.development` file exists with specific variables
    When the CLI application starts in 'development' mode
    Then the application has access to the variables defined in `.env.development`.

Scenario: Load production environment variables
    Given a `.env.production` file exists with specific variables
    When the CLI application starts in 'production' mode
    Then the application has access to the variables defined in `.env.production`.

Scenario: Fallback to default .env file
    Given a `.env` file exists and no environment-specific file exists for the current mode
    When the CLI application starts
    Then the application has access to the variables defined in `.env`.

Scenario: Environment variables override file variables
    Given an environment variable `MY_VAR` is set in the system
    And a `.env` file also defines `MY_VAR`
    When the CLI application starts
    Then the application uses the value of `MY_VAR` from the system environment variable.
```

## UI/UX

No direct UI. Configuration is done via `.env` files (e.g., `.env`, `.env.development`, `.env.production`) and potentially a command-line argument or environment variable (e.g., `NODE_ENV`) to specify the current environment mode.

## Additional Information

- Do not use any external library like `dotenv` to load environment variables. Instead, use Node.js's built-in `fs` and `path` modules to read the `.env` files and parse them manually.
- The order of precedence should be: System Environment Variables > Environment-specific `.env` file > Default `.env` file.

## Implementation Details

- [c1-node-cli Implementation Plan](/containers/c1-node-cli/docs/f1-environment-management.plan.md)

_End of Feature Documentation for **f1-environment-management**_
