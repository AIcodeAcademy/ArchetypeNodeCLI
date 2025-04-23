- [ ] language rules
- [ ] architecture rules
- [ ] archetype rules
- [ ] some kind of json with archetypes definitions

```json	  
{
  "architectures": [
    {
      "name": "layered",
      "description": "A layered architecture for simple few features applications",
      "scaffolding":["application", "domain", "system"],
      "guardrails":"Dependencies go top to bottom (application -> domain -> system)",
    },
    {
      "name": "modular",
      "description": "A modular architecture for complex applications with many features",
      "scaffolding":[
        { "module": "feature-1", "layers": ["application", "domain", "system"]}, 
        { "module": "feature-2", "layers": ["application", "domain", "system"]}
      ],
      "guardrails":"Dependencies go top to bottom (application -> domain -> system), inside and between modules",
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
  ],
    "archetypes": [
    {
      "name": "node-cli",
      "tier": "frontend",
      "ux": "cli",
      "description": "A Node.js CLI application",
      "language": "Typescript",
      "framework": "Node.js",
      "architecture": "layered",
      "paradigm": "functional",
    }
  ],
}
```