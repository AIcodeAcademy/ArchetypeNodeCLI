# Features

Minimal set of dependencies.

Adapters for different libraries to make the code less dependent.

Utilities to make the code more readable and easier to maintain.

## Cache

In memory or file based cache.

## Strings

- Safe strings for file names or urls

- Hashing strings to detect changes

- Cyphering strings to store or retrieve secrets

## Monitoring

- Logging progress

- Logging errors

## Arguments and node process

- Get the first argument from the command line (example a password to decrypt a file)

- Get the local directory of the project
  
- Validate arguments and environment variables (with zod or similar)

# Architecture

Layered architecture.

  - Presentation layer: App folder

  - Domain layer: Domain folder

  - Infrastructure layer: Repository  folder

Functional programming.

Fully typed.

Tested with integration tests.

Linted with biome.


# Real use case

Rules and prompts synchronization for several tools from a source folder.

- Source folder:
  - ./ai/builder/rules
  - ./ai/builder/prompts


- Target Tools:
  - Must have
    - Cursor rules: 
      - ./cursor/rules *.mdc
    - GitHub Copilot:  
      - "github.copilot.chat.codeGeneration.instructions"
      - chat.promptFilesLocations
  . Nice to Have
    - Cline
    - Windsurf: .windsurfrules

// https://code.visualstudio.com/docs/copilot/copilot-customization


