---
name: expo-screen
description: Create a new Expo Router screen with proper layout integration, NativeWind styling, and TypeScript types. Triggers when user asks to create a screen, page, or route.
argument-hint: "[screen-name] [route-group: tabs|auth|root]"
---

Create a new Expo Router screen following these steps:

## Steps

1. **Determine route group** from `$ARGUMENTS`:
   - `tabs` → `app/(tabs)/[name].tsx`
   - `auth` → `app/(auth)/[name].tsx`
   - `root` (default) → `app/[name].tsx`

2. **Create the screen file** using this template:

```tsx
import { View, Text } from "react-native";

export default function ScreenNameScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900 px-4 pt-4">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        Screen Title
      </Text>
    </View>
  );
}
```

3. **Update the layout** if the screen is in a group:
   - For tabs: Add `<Tabs.Screen>` entry in `app/(tabs)/_layout.tsx`
   - For auth: Add `<Stack.Screen>` entry in `app/(auth)/_layout.tsx`
   - For root: Add `<Stack.Screen>` entry in `app/_layout.tsx`

4. **Run type check**: `npx tsc --noEmit` to verify no type errors

## Rules
- Screen files MUST use `export default function` (Expo Router requirement)
- Use NativeWind `className` for all styling
- Support dark mode with `dark:` prefix
- Use `useLocalSearchParams()` for dynamic route params
