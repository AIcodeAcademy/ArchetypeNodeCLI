
# 🧭 TypeScript Style Guide for Clean and Robust Code

> This guide is designed to be followed by a Large Language Model (LLM) generating framework-agnostic TypeScript. Its goal is to ensure clarity, consistency, testability, and maintainability. Made by ChatGPT.

## Table of Contents

1. Naming Conventions
2. Typing and Declarations
3. Functions and Methods
4. Modules and Imports
5. Handling Optional or Unknown Values
6. Array Best Practices
7. Asynchronous Code
8. Classes and Objects
9. Error Handling
10. File Structure and Organization
11. Other Conventions and Recommendations

---

## 1. Naming Conventions

### Rules

- Use `camelCase` for variables, functions, and methods.
- Use `PascalCase` for classes, types, and interfaces.
- Use `UPPER_SNAKE_CASE` for constants and enums.
- Names should be descriptive, preferably in English, and avoid unconventional abbreviations.
- Function names should follow a **verb + optional noun** pattern (e.g., `loadUser`, `calculateTotal`).
- File names should follow the `kebab-case` convention without redundant suffixes.

### ✅ Examples

```ts
const MAX_RETRIES = 3;

function calculateInvoiceTotal(items: Item[]): number {
  // ...
}

interface UserProfile {
  id: string;
  name: string;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'wire_transfer';

export const userService = {
  getUserById,
  updateUserProfile,
};
```

### ❌ Anti-patterns

```ts
const MaxRetries = 3;             // ❌ PascalCase for constants
function Calculateinvoice() {}    // ❌ PascalCase and malformed
interface IUser {}                // ❌ Unnecessary "I" prefix
type payment_method = string;     // ❌ snake_case
```

---

## 2. Typing and Declarations

### Rules

- Always use explicit types for variables, parameters, and return values.
- Avoid type inference in exported APIs or shared logic.
- Prefer `type` over `interface` for defining data shapes.
- Use `interface` only when describing object behavior or implementing polymorphism.
- Create reusable type aliases and store them in dedicated `*.types.ts` files.
- Use `unknown` for values of uncertain type, and avoid `any` unless absolutely necessary.
- Use `never` for unreachable code or impossible cases.
- Use `void` for functions that do not return a value.
- Prefer union types over enums unless interoperability or strict identity is required.

### ✅ Examples

```ts
type ProductId = string;

type Product = {
  id: ProductId;
  name: string;
  price: number;
  inStock: boolean;
};

function calculateTotal(products: Product[]): number {
  return products.reduce((sum, p) => sum + p.price, 0);
}

function handleInput(value: unknown): void {
  if (typeof value === 'string') {
    console.log(value.trim());
  }
}
```

### ❌ Anti-patterns

```ts
let result;                       // ❌ Implicit `any`
function getData(d) { return d }  // ❌ No parameter or return type
type product = { ... };           // ❌ Type name should use PascalCase
function doSomething(): any {}    // ❌ Avoid `any`
```


---

## 3. Functions and Methods

### Rules

- Name functions using a **verb** that reflects their action.
- Use a single level of abstraction per function.
- Favor **pure functions** for predictable and testable logic.
- Isolate **side effects** into clearly identifiable functions.
- Prefer `function` declarations over arrow functions for top-level or exported logic.
- Use arrow functions only for short callbacks, inline expressions, or preserving `this`.
- Define parameter and return types explicitly.
- Use early returns to reduce nesting and improve readability.

### ✅ Examples

```ts
function fetchUserById(id: string): Promise<User> {
  return apiClient.get(`/users/${id}`);
}

const transformNames = (names: string[]): string[] =>
  names.map(name => name.trim().toUpperCase());

function logError(error: unknown): void {
  console.error('Unexpected error:', error);
}
```

### ❌ Anti-patterns

```ts
const getUser = (id) => api.get(`/u/${id}`);  // ❌ No parameter type

function process(data) {
  if (data) {
    if (data.items) {
      for (let i = 0; i < data.items.length; i++) {
        // ...                          // ❌ Deep nesting
      }
    }
  }
}

const calculate = function(a, b) { return a + b };  // ❌ Unclear purpose, no types
```

