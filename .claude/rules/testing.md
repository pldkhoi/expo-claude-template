---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/__tests__/**"
---

# Testing Standards

## Framework
- Jest + React Native Testing Library (RNTL)
- Test files: `*.test.tsx` colocated with source files

## Query Priority (best to worst)
1. `getByRole` / `getByLabelText` — accessibility-first
2. `getByText` / `getByDisplayValue` — visible to user
3. `getByPlaceholderText` — visible but fragile
4. `getByTestId` — last resort only

## Test Patterns
- Test user behavior, not implementation details
- Don't test state directly — test what the user sees
- Use `fireEvent` or `userEvent` for interactions
- Use `waitFor` for async operations
- Wrap renders with necessary providers (QueryClient, Theme, etc.)

## Mocking
- Mock `@/lib/supabase` for all Supabase calls
- Mock `expo-router` for navigation assertions
- Mock native modules that aren't available in Jest
- Keep mocks minimal — only mock what you must

## Coverage
- Aim for meaningful coverage, not 100%
- Every new component should have at least a render test
- Every service/hook should test success and error paths
- Test edge cases: empty state, loading, error, boundary values

## Structure
```typescript
describe("ComponentName", () => {
  it("renders correctly", () => { ... });
  it("handles user interaction", () => { ... });
  it("shows error state", () => { ... });
});
```
