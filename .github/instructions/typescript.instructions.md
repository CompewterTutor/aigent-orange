---
applyTo: '**/*.ts, **/*.tsx, tsconfig.json, **/*.d.ts'
description: 'TypeScript coding standards and best practices for applications and libraries'
---

# TypeScript Best Practices for Copilot

Purpose: Provide guidance for producing readable, maintainable, and safe TypeScript across apps and libraries. Emphasize strict typing, small surface areas for any `any` usage, runtime validation at boundaries, and solid engineering practices for build/test/tooling.

## 1. Type System & Strictness
- Always enable the strict family of compiler options in `tsconfig.json`:
  - `strict: true`, `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` where feasible.
- Prefer explicit types on public APIs (exports, function parameters/returns). Let local variables rely on inference when it improves readability.
- Avoid `any`. If absolutely necessary, narrow it with a named alias and document why. Prefer `unknown` over `any` and add type guards before use.

## 2. Project Configuration
- `tsconfig.json` (example minimal):
  - `target`/`lib` aligned with your runtime (Node/browser).
  - `moduleResolution: "node"`, `esModuleInterop: true`, `skipLibCheck: true`.
  - Use `composite` and project references for large monorepos.
- Keep a base `tsconfig.base.json` for shared options and extend in package-level `tsconfig.json` files.

## 3. Runtime Validation and Boundaries
- At public boundaries (HTTP handlers, CLI args, external data), validate input at runtime. Use a runtime schema library (Zod, io-ts, Yup) and derive TypeScript types from schemas where possible.
- For library code, prefer well-documented runtime assertions rather than silent assumptions.

## 4. Types and Patterns
- Use discriminated unions for variant types.
- Prefer `Record<K, V>` or mapped types to express indexed shapes vs `{ [k: string]: any }`.
- Use `Readonly<T>` and `as const` for stable constants.
- Avoid deep structural types that are hard to reason about; split into smaller named types.
- Use `ReturnType<>`, `Parameters<>` judiciously to avoid coupling across modules.

## 5. Generics
- Prefer upper-case single-letter param names only for simple generic types (`T`, `K`, `V`). For more complex generics, choose descriptive names (e.g., `ResponseData`, `InputShape`).
- Constrain generics with `extends` when needed, and keep generic arity small (1–2 params usually).

## 6. Module Design
- Prefer small modules with a single responsibility and explicit exports. Avoid large barrel files that re-export many unrelated symbols; that can make tree-shaking and type-checking slower.
- For libraries, ship types alongside compiled JS (`.d.ts`) and ensure `types` in `package.json` points to the correct entry.

## 7. Tooling
- ESLint + TypeScript: use `@typescript-eslint` plugin and extend recommended rules. Combine with Prettier for formatting.
- Enable `noUnusedLocals` and `noUnusedParameters` in CI to avoid dead code.
- `skipLibCheck: true` for faster CI builds, but fix upstream type issues when practical.

## 8. Testing & Type Tests
- Unit test with your preferred runner (Vitest/Jest) and assert both runtime behavior and type contracts where feasible.
- Consider using `tsd` for type assertion tests in libraries (e.g., ensure certain calls compile or reject expected usages).

## 9. Build & Distribution
- For libraries, prefer publishing ES modules and types. Use `tsup`, `tsc --build` or `rollup` with `typescript` plugin as appropriate.
- Keep `declaration: true` behind a separate build step and verify emitted `.d.ts` files.

## 10. React + TSX
- For React projects, prefer function components with explicit prop types using `interface Props` and `React.FC` only when appropriate (avoid `React.FC` if it hides `children` semantics you don't want).
- Use `useCallback`, `useMemo` sparingly and type hooks correctly (e.g., `useRef<HTMLDivElement | null>(null)`).
- Use component-level prop narrow types and document optional props carefully.

## 11. Common Pitfalls & How to Avoid
- Overuse of `as`: prefer proper typings and helper functions to coerce types safely.
- Long union types in props: prefer discriminated unions or refactor into variant components.
- Mixing runtime and compile-time assumptions: always validate at runtime.

## 12. Security Considerations
- Treat user input as untrusted. Validate and sanitize before using in SQL, command execution, DOM insertion, or template engines.
- Avoid embedding secrets in source; use environment variables and secret management.

## 13. Examples & Templates
- Provide small examples for common patterns (API handler + Zod schema; typed Redux/Query store; reusable typed utilities). Keep them in the repo's `docs/` or `examples/` folder.

## 14. Copilot Checklist
- ✅ Use `strict` TypeScript config.  
- ✅ Minimize `any`/`as` uses.  
- ✅ Validate external inputs at runtime with schema libraries.  
- ✅ Add unit tests and type tests where public APIs change.  
- ✅ Ensure `package.json` points to correct `types` entry when publishing.  


---

For additional project-specific conventions (React vs Node library vs CLI), extend these rules with a small README in `.github/instructions` or in the target package folder.