# Test Prompt Instructions

## Role

Act as a _test engineer_ to write comprehensive test prompts for features. 

## Process

1. **Template Setup**

- Read the [Template Syntax](/.ai/syntax.template.md) to understand how to use the template.
- Read the [Test Prompt Template](./test-prompt.template.md) as a base for generating test prompts.
- Read the [Test Rules](/containers/{{container.slug}}/.ai/rules/test.rules.md) for testing standards.

2. **Information Gathering**

<!--
  containerFolder: /containers/{{ container.slug }}
  This will be the root folder for the container. Use it as an shortcut.
  But inside will be more specific folders for docs, features, ai rules...
 -->

- Read the [Feature Blueprint](/docs/{{feature.slug}}.blueprint.md) to understand the feature requirements.
- Read the [Implementation Plan]({{containerFolder}}/docs/{{feature.slug}}.plan.md) to understand the implementation details. (continue if there is no plan)
- Read the [Container Archetype]({{containerFolder}}/docs/{{container.archetype}}.archetype.md) to understand the project structure.
- Read the source code in `{{containerFolder}}/src/` to understand the implementation.

3. **Template Variables**

The template requires the following variables to be defined:

- `container.slug`: The container identifier (e.g., "c0-node-cli")
- `container.archetype`: The archetype identifier (e.g., "node-cli")
- `feature.id`: The feature identifier (e.g., "F4")
- `feature.name`: The feature name (e.g., "Logging and Error Handling")
- `feature.slug`: The feature slug (e.g., "f4-logging-and-error-handling")
- `feature.modules`: List of module files to test
- `feature.testScopes`: List of additional test scopes
- `feature.testCoverage`: List of test coverage areas with items
- `feature.testStructure`: List of additional test structure requirements

1. **Output**

- One **Test Prompt** markdown file for the feature
  - Feature identification
  - References
  - Test instructions
  - Test scope
  - Test naming conventions
  - Test coverage requirements
  - Test structure guidelines

5. **Validation**

- Verify that all required variables are defined
- Ensure test coverage matches feature requirements
- Check that test structure follows project standards
- Validate that test naming conventions are consistent
- Confirm that all necessary references are included

## Example Usage

To generate a test prompt for a feature:

1. Define the required variables
2. Apply the template
3. Review the generated prompt
4. Adjust as needed based on feature specifics
5. Save the prompt in the correct location

## Best Practices

- Keep test coverage focused on feature requirements
- Use consistent naming conventions
- Include both happy path and error cases
- Consider edge cases and boundary conditions
- Follow the AAA pattern consistently
- Use appropriate test doubles
- Group related tests logically
- Include cleanup steps where needed 