# Feature F6 - Business Example

### Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)

## Description

A practical business example that demonstrates how to use the archetype by implementing a weather forecast feature that retrieves current weather data based on the user's IP address location, showcasing integration with external APIs, caching, and command handling.

## Goal / User Story

- **As a:** Node.js developer
- **I want to:** see a practical example of the archetype in action
- **So that:** I can understand how to implement real-world features using the archetype's patterns and utilities

## Acceptance Criteria / Scenarios

```gherkin
Scenario: Get weather forecast for current location
    Given I have internet access
    When I run the weather command
    Then I get weather data for my current location
    And the data includes city, country, and daily forecasts

Scenario: Use cached location data
    Given I have previously run the weather command
    When I run the weather command with cache enabled
    Then the system uses cached location data
    And only fetches new weather data

Scenario: Handle API errors gracefully
    Given there is an API error
    When I run the weather command
    Then the error is logged appropriately
    And a user-friendly error message is displayed
```

## UI/UX

- Command-line interface with:
  - Clear command syntax
  - Informative output format
  - Error messages
  - Cache control options
  - Logging of operations

## Additional Information

### Dependencies
- IP API for location data
- OpenMeteo API for weather data
- Caching system
- Logging system
- Command handling system

### Preconditions
- Internet access
- Valid API keys (if required)
- Proper configuration
- Access to cache storage

## Implementation Details

List of implementation plans for each container:
- [ArchetypeNodeCLI Implementation Plan](/containers/archetype-node-cli/docs/f6-business-example.plan.md)

### Current Implementation Structure
1. Command Layer
   - `meteo.command.ts`: Command handler
   - Manages command execution
   - Handles errors and logging

2. Service Layer
   - `meteo.service.ts`: Business logic
   - Coordinates API calls
   - Manages caching
   - Maps data between formats

3. Domain Layer
   - `meteo.type.ts`: Data types
   - `meteo.mapper.ts`: Data mapping
   - `cache.utils.ts`: Caching utilities

4. External Integrations
   - IP API integration
   - OpenMeteo API integration
   - Caching system integration

### Business Example Patterns
- Command pattern for CLI interaction
- Repository pattern for external data access
- Caching pattern for performance optimization
- Mapping pattern for data transformation
- Error handling and logging integration

> End of Feature Documentation for `f6-business-example` 