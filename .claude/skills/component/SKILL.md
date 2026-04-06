---
name: component
description: Create a reusable React Native component with NativeWind styling, TypeScript props interface, and optional test file. Triggers when user asks to create a component.
argument-hint: "[component-name]"
---

Create a reusable component for `$ARGUMENTS`:

## Steps

1. **Determine location**:
   - UI primitives (Button, Input, Card, etc.) → `components/ui/[Name].tsx`
   - Feature components → `components/[Name].tsx`

2. **Create the component file**:

```tsx
import { View, Text, type ViewProps } from "react-native";

interface [Name]Props extends ViewProps {
  // Define specific props
  className?: string;
}

export const [Name] = ({ className = "", children, ...props }: [Name]Props) => {
  return (
    <View className={`[base-styles] ${className}`} {...props}>
      {children}
    </View>
  );
};
```

3. **Create test file** at `[Name].test.tsx` (same directory):

```tsx
import { render } from "@testing-library/react-native";
import { [Name] } from "./[Name]";

describe("[Name]", () => {
  it("renders correctly", () => {
    const { getByText } = render(<[Name]>Test</[Name]>);
    expect(getByText("Test")).toBeTruthy();
  });
});
```

4. **Run type check**: `npx tsc --noEmit`

## Rules
- ALL styling via NativeWind `className` — no StyleSheet.create
- Accept `className` prop for style overrides
- Use named export (not default)
- Support dark mode with `dark:` prefix
- Add `accessibilityLabel` to interactive elements
- Follow patterns from existing `components/ui/` files
