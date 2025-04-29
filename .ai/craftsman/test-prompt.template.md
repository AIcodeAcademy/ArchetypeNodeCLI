---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
feature: "The feature to be tested"
folder: "/containers/{{ container.slug }}/docs/{{ feature.id }}/"
file: "{{ feature.slug }}.test.md"
---

# Feature {{ feature.id }} - {{ feature.name }} Test Prompt

### Reference

<!--
  {{ containerFolder: /containers/{{container.slug}} }}
  {{ folderRules: {{containerFolder}}/.ai/}}
  -->

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Feature Documentation](/docs/{{feature.slug}}.blueprint.md)
- [Archetype Node CLI](/containers/{{container.slug}}/docs/{{container.archetype}}.archetype.md)
- [Test Rules](/containers/{{container.slug}}/.ai/rules/test.rules.md)

## Prompt

You are to generate a comprehensive set of tests for the {{ feature.id }} {{ feature.name }} feature as implemented in the current `src` folder. Follow these instructions:

1. **Read the following files for context and requirements:**
   - [Feature Blueprint](/docs/{{feature.slug}}.blueprint.md)
   - [Implementation Plan]({{containerFolder}}/docs/{{feature.slug}}.plan.md) (if available)
   - [Relevant source files in `{{containerFolder}}/src/`]
   - [Test Rules]({{folderRules}}/test.rules.md)

2. **Test Scope:**
   - Cover all acceptance criteria and scenarios described in the feature blueprint.
   - Focus on the following modules:
     {{ for module in feature.modules }}
     - `{{ module }}`
     {{ end module }}
   {{ for scope in feature.testScopes }}
   - {{ scope }}
   {{ end scope }}

3. **Test Naming:**
   - Write tests under the `test/{{feature.id}}` folder.
   - Name test files after the subject, e.g., `{{ for module in feature.modules }}{{ module | replace: '.ts', '.test.ts' }}{{ end module }}`.
   - Use descriptive test case names following the test rules.

4. **Test Coverage:**
   {{ for coverage in feature.testCoverage }}
   - Test {{ coverage }}:
     {{ for item in coverage.items }}
     - {{ item }}
     {{ end item }}
   {{ end coverage }}

5. **Test Structure:**
   - Follow the AAA pattern (Arrange, Act, Assert)
   - Use proper test doubles (mocks, spies, stubs) where needed
   - Ensure each test case has a single assertion
   - Group related tests in describe blocks
   {{ for structure in feature.testStructure }}
   - {{ structure }}
   {{ end structure }}

> End of prompt for {{ feature.id }} {{ feature.name }} tests. 