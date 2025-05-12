# Feature F2 - Configuration System Test Prompt

### Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Feature Documentation](/docs/f2-configuration-system.blueprint.md)
- [Archetype Node CLI](/containers/c0-node-cli/docs/node-cli.archetype.md)
- [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

## Prompt

You are to generate a comprehensive set of tests for the F2 Configuration System feature as implemented in the current `src` folder. Follow these instructions:

1. **Read the following files for context and requirements:**
   - [Feature Blueprint](/docs/f2-configuration-system.blueprint.md)
   - [Implementation Plan](/containers/c0-node-cli/docs/f2/f2-configuration-system.plan.md) (if available)
   - [Relevant source files in `/src/system/config/`, `/src/system/env/`, `/src/system/json.utils.ts`]
   - [Test Rules](/containers/c0-node-cli/.ai/rules/test.rules.md)

2. **Test Scope:**
   - Cover all acceptance criteria and scenarios described in the feature blueprint.
   - Focus on the following modules:
     - `config.repository.ts`
     - `config.type.ts`
     - `env.adapter.ts`
     - `json.utils.ts`
   - Test configuration loading from environment variables, JSON files, and fallback to defaults.
   - Validate type safety, error handling, and correct merging of configuration sources.

3. **Test Naming:**
   - Name test files after the subject, e.g., `config.repository.test.ts`, `env.adapter.test.ts`.
   - Use descriptive test case names.

4. **Test Coverage:**
   - Test loading configuration from environment variables.
   - Test loading configuration from a JSON file.
   - Test fallback to default values when no config is provided.
   - Test error handling for invalid/missing files or variables.
   - Test type validation and structure of the loaded config.

> End of prompt for F2 Configuration System tests.



