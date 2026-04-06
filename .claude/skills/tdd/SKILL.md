---
name: tdd
description: Test-Driven Development workflow for React Native. Write failing tests first, then implement code to pass, then refactor. Use when building new features with TDD approach.
argument-hint: "[feature-description]"
disable-model-invocation: true
---

Run a TDD cycle for: `$ARGUMENTS`

## TDD Workflow

### Step 1: RED - Write Failing Test
Write a test that describes the desired behavior. The test MUST fail initially.

```bash
# Run to confirm it fails
npm test -- --testPathPattern="[test-file]"
```

### Step 2: GREEN - Make It Pass
Write the minimum code needed to make the test pass. No more, no less.

```bash
# Run to confirm it passes
npm test -- --testPathPattern="[test-file]"
```

### Step 3: REFACTOR - Clean Up
Improve the code without changing behavior. Re-run tests after each change.

```bash
# Run to confirm nothing broke
npm test -- --testPathPattern="[test-file]"
```

### Step 4: REPEAT
Go back to Step 1 for the next behavior.

## Test Templates

### Component Test
```tsx
import { render, fireEvent } from "@testing-library/react-native";

describe("[Feature]", () => {
  it("should [behavior]", () => {
    const { getByText } = render(<Component />);
    expect(getByText("expected")).toBeTruthy();
  });
});
```

### Hook Test
```tsx
import { renderHook, waitFor } from "@testing-library/react-native";

describe("[Hook]", () => {
  it("should [behavior]", async () => {
    const { result } = renderHook(() => useHook());
    await waitFor(() => expect(result.current.value).toBe(expected));
  });
});
```

## Rules
- ALWAYS write the test BEFORE the implementation
- Each test should test ONE behavior
- Keep tests small and focused
- Use descriptive test names: "should [verb] when [condition]"
- Mock external dependencies (Supabase, navigation, native modules)
- Run type check after refactor: `npx tsc --noEmit`
