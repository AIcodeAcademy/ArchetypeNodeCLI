# Feature workflow

Follow a bottom up implementation

## Utils

- Define adapters to use external services or dependencies

## Infrastructure

- Define domain types needed 
- Define functions to fetch and save data 

## Domain 

- Define validation rules for the domain types
- Define service functions to implement the feature
- Call infrastructure to load or save data

## Presentation

- Obtain arguments from user and configurations from environment
- Call logic and validation functions
- Define and use formatters to present the results
- Log calls and errors
