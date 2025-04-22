- [ ] language rules
- [ ] architecture rules
- [ ] archetype rules
- [ ] some kind of json with archetypes definitions

```json	  
{
  "architectures": [
    {
      "name": "layered",
      "description": "A layered architecture",
      "scaffolding":["application", "domain", "system"]
    },
    {
      "name": "modular",
      "description": "A modular architecture",
      "scaffolding":["{{domain-1}}", "{{domain-2}}", "{{domain-9}}"]
    }
  ],
  "archetypes": [
    {
      "name": "node-cli",
      "ux": "cli",
      "tier": "frontend",
      "description": "A Node.js CLI application",
      "language": "Typescript",
      "framework": "Node.js",
      "architecture": "layered",
    }
  ],
  "artifacts": [
    {
      "name": "adapter",
      "description": "Wraps an external dependency.",
    },
    {
      "name": "controller",
      "description": "Redirects logic based on user input.",
    },
    {
      "name": "repository",
      "description": "Implements a data access logic.",
    },
    {
      "name": "service",
      "description": "Implements a business logic.",
    },
    {
      "name": "type",
      "description": "Defines types and defaults.",
    },
    {
      "name": "util",
      "description": "A utility module.",
    },
    {
      "name": "validator",
      "description": "Validates data.",
    }
  ]
}
```