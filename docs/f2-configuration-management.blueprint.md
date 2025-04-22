# Feature F2 - Configuration Management

### Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)

## Description

Handle application configuration loading from files or environment variables.

## Goal / User Story

- **As a:** Developer using the CLI archetype
- **I want to:** Define and access application configuration settings
- **So that:** I can control the application's behavior without hardcoding values.

## Acceptance Criteria / Scenarios

```gherkin
Scenario: Load configuration from a default file
    Given a default configuration file (e.g., `config.json`) exists with settings
    When the CLI application starts
    Then the application loads the configuration from the default file.

Scenario: Load configuration from an environment-specific file
    Given a `config.development.json` file exists with specific settings
    And the application is running in 'development' mode
    When the CLI application starts
    Then the application loads configuration, merging settings from `config.development.json` over the default file.

Scenario: Configuration values overridden by environment variables
    Given a configuration setting `LOG_LEVEL` is defined in a config file
    And an environment variable `APP_LOG_LEVEL` (or similar, based on convention) is set
    When the application loads configuration
    Then the value from the environment variable `APP_LOG_LEVEL` overrides the value from the config file for `LOG_LEVEL`.

Scenario: Access configuration values within the application
    Given the configuration has been loaded
    When a part of the application needs a configuration value (e.g., API endpoint)
    Then it can easily retrieve the correct value from the loaded configuration.
```

## UI/UX

No direct UI. Configuration is managed through files (e.g., `config.json`, `config.<env>.json`) and environment variables. A clear convention for naming environment variables that override config settings should be established (e.g., prefixing with `APP_`).

## Additional Information

- Consider using a library like `zod` for schema validation of configuration files.
- Do not use any other library for loading configuration files. Instead, use Node.js's built-in `fs` and `path` modules to read the configuration files and parse them manually.

## Implementation Details

- [c1-node-cli Implementation Plan](/containers/c1-node-cli/docs/f2-configuration-management.plan.md)

_End of Feature Documentation for **f2-configuration-management**_
