---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript & NativeWind Code Style

## TypeScript
- Strict mode enabled — no `any`, no non-null assertions (`!`) without justification
- Prefer `interface` over `type` for object shapes
- Use `const` by default, `let` only when reassignment is needed
- Arrow function components: `export const MyComponent = ({ props }: Props) => { ... }`
- Destructure props in function signature

## NativeWind Styling
- ALL styling via `className` prop — never use `StyleSheet.create()`
- Use Tailwind utility classes directly on components
- Dark mode: use `dark:` prefix (e.g., `className="bg-white dark:bg-gray-900"`)
- Responsive: use breakpoint prefixes where needed
- Group related classes: layout → spacing → colors → typography

## Exports
- Named exports for components, hooks, utilities
- Default exports ONLY for route screens in `app/` (Expo Router requirement)
- Re-export from index files for clean imports

## Naming
- PascalCase: Components, Types, Interfaces
- camelCase: functions, variables, hooks (prefix with `use`)
- UPPER_SNAKE_CASE: constants and env vars
- kebab-case: file names for non-component files

## Imports (order)
1. `react` / `react-native`
2. `expo-*` packages
3. Third-party packages
4. `@/` aliased imports
5. Relative imports

## File Organization
- Max ~200 lines per file — split if larger
- One component per file
- Colocate tests: `MyComponent.test.tsx` next to `MyComponent.tsx`
- Types used in one file stay in that file; shared types go to `types/`
