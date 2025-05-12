# Node CLI Archetype rules
- **Language** : TypeScript
- **Architecture** : Modular
- **Paradigm** : Functional and Object Oriented
- **Framework** : Node.js
- **Testing** : {{: built-in | Jest }}
- **Linting** : {{: Biome | ESLint }}
- **Formatting** : {{: Biome | Prettier }}

## Dependencies
This archetype is dependency free, use modern Node built-in functions:

- `fetch` to make http requests
- `styleText` to colorize the console output 
- `parseArgs` to parse command line arguments 
- `node:fs` to read and write files

Try to avoid 3rd party libraries.

### Adapters
- Write adapters to wrap the built-in functions (or 3rd party libraries) to the needs of the application, making them easier to use, test and change.
- Create a module in the shared folder to store the adapter.

**Example:**
```typescript
// src/shared/adapters/file.ts
import fs from "node:fs/promises";

const ENCODING = "utf-8";

export const file = {
  async read(path: string): Promise<string> {
    return await fs.readFile(path, ENCODING);
  },
  async write(path: string, content: string): Promise<void> {
    return await fs.writeFile(path, content);
  }
}
```

### DevDependencies
- `Biome` for linting and formatting (alternatively use `ESLint` and `Prettier`)

## Testing
- Use the built-in testing module (alternatively use `Jest`)

## Scripts
- `start` to start the application in production mode
- `dev` to start the application in development mode
- `build` to build the application
- `test` to run the tests
- `lint` to run the linting and formatting

## Configuration
- `.env` to store the environment variables
  - add `.env.example` to instruct other devs 
  - ignore `.env` in the `.gitignore` file

## Modules
Beware of naming conflict:
- In Modular architecture a module is a folder with components that are related.
- In Node a module is a file that exports something.
In this section we are talking about the Modular architecture.
Modular architecture, a module for each feature.

### Commands
- A CLI is based on commands. So teh command will be the unit of feature.
- Create a module for each command. Adapt the scaffoldting of modular architecture to this naming convention.

**Example:**
```
src/
  application/
    commands/
      command-name/
        command-name.command.ts
        command-name.service.ts
        command-name.repository.ts
        command-name.type.ts
```	

### Shared
- Create a shared module for the components that are used by multiple commands.

**Example:**
```
src/
  application/
    shared/
      file/
        file.adapter.ts
```

## Imports / Exports
- Back to Node and Typescript, the name module refers to a file.
- Export only one thing per file. Ideally an object or a class.
- Use named exports. Exceptionally use default export for classes.
- Import using the relative full path including the `.ts` file extension.

**Example:**
```typescript
// src/application/commands/command-name/command-name.service.ts
export const commandNameService = {
  async doSomething() {
    console.log("Hello, world!");
  }
}

// src/application/commands/command-name/command-name.command.ts
import { commandNameService } from "./command-name.service.ts";

export const commandName = {
  async run() {
    await commandNameService.doSomething();
  }
}
```

