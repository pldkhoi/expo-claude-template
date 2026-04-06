---
paths:
  - "app/**/*.ts"
  - "app/**/*.tsx"
---

# Expo Router & Navigation Patterns

## File-Based Routing
- Every file in `app/` becomes a route automatically
- `app/index.tsx` → `/`
- `app/(tabs)/index.tsx` → `/(tabs)/`
- `app/(auth)/sign-in.tsx` → `/(auth)/sign-in`
- `app/[id].tsx` → dynamic route with `id` param
- `app/+not-found.tsx` → 404 fallback

## Layout Groups
- `(groupName)` wraps routes without affecting URL
- `_layout.tsx` defines the layout for its directory
- Use `Stack`, `Tabs`, or custom layouts
- Root `_layout.tsx` wraps the entire app (providers go here)

## Navigation
- Use `Link` component for declarative navigation
- Use `router.push()` / `router.replace()` for programmatic navigation
- Import from `expo-router`, never from `@react-navigation/*` directly
- Use `useLocalSearchParams()` for route params
- Use `useRouter()` for navigation actions

## Route Screens
- Must use `export default function` (Expo Router requirement)
- Keep route screens thin — delegate to components
- Load data in the screen, pass to child components

## Deep Linking
- Automatic with file-based routing
- Custom scheme defined in `app.json` → `scheme` field
- Validate deep link parameters before use

## Typed Routes
- `experiments.typedRoutes: true` is enabled in app.json
- Use `href` type checking for Link and router.push
- Route params are type-checked automatically
