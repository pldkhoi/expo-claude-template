# Expo + Claude Code Template

## Project Overview
Mobile app template built with Expo Router, TypeScript, Supabase, NativeWind, Zustand, and TanStack Query. Designed for rapid AI-assisted development with comprehensive Claude Code configuration.

## Tech Stack
- **Runtime**: Expo SDK 54, React Native 0.81, TypeScript (strict mode)
- **Routing**: Expo Router v6 (file-based routing with typed routes)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Backend**: Supabase (Auth, Database, Row Level Security)
- **Client State**: Zustand (UI state, auth session, preferences)
- **Server State**: TanStack Query v5 (API data, caching, sync)
- **Testing**: Jest + React Native Testing Library

## Directory Structure
```
app/                    # Expo Router pages (file = route)
  (tabs)/               # Tab navigation group
  (auth)/               # Auth screens (sign-in, sign-up)
  _layout.tsx           # Root layout (providers, navigation)
components/             # Reusable React Native components
  ui/                   # Primitives (Button, Input, Card)
hooks/                  # Custom React hooks
lib/                    # Core utilities
  supabase.ts           # Supabase client singleton
  queryClient.ts        # TanStack Query client
stores/                 # Zustand stores (client state only)
services/               # API services (TanStack Query hooks)
types/                  # TypeScript type definitions
  database.ts           # Supabase generated types
constants/              # App configuration and constants
assets/                 # Images, fonts, static files
```

## Build & Run Commands
```bash
npx expo start              # Start dev server
npx expo start --ios        # iOS simulator
npx expo start --android    # Android emulator
npx expo start --web        # Web browser
npm test                    # Run tests
npx tsc --noEmit            # Type check
npx expo lint               # ESLint
npx expo prebuild           # Generate native projects
eas build --platform ios    # Production iOS build
eas build --platform android # Production Android build
```

## Coding Conventions
- TypeScript strict mode — no `any`, no `as` type assertions unless justified
- NativeWind `className` for ALL styling — never use `StyleSheet.create`
- Named exports for components and hooks — no default exports (except route screens)
- Route screens in `app/` use default exports (Expo Router requirement)
- Arrow function components: `export const MyComponent = () => { ... }`
- File naming: PascalCase for components, camelCase for utilities/hooks
- Import order: react → expo → third-party → @/ aliases → relative
- Path aliases: use `@/` prefix (e.g., `@/lib/supabase`, `@/stores/authStore`)

## State Management Rules
- **Zustand** = client-only state (UI toggles, auth session, user preferences)
- **TanStack Query** = server state (API data from Supabase, caching, sync)
- Never put server data in Zustand — use `useQuery` for reads, `useMutation` for writes
- Invalidate queries after mutations: `queryClient.invalidateQueries()`

## Common Workflows
- **Add a screen**: Create file in `app/` — it becomes a route automatically
- **Add a tab**: Create file in `app/(tabs)/`, update `app/(tabs)/_layout.tsx`
- **Add an API service**: Create in `services/` using TanStack Query hooks pattern (see `services/example.ts`)
- **Add a store**: Create in `stores/` using Zustand `create` pattern (see `stores/authStore.ts`)
- **Add a component**: Create in `components/` with NativeWind styling + TypeScript props
- **Add a Supabase table**: Create migration in `supabase/migrations/`, add types to `types/database.ts`

## Gotchas
- `import "../global.css"` MUST be the first import in `app/_layout.tsx`
- Supabase auth uses `localStorage` via `expo-sqlite` — not AsyncStorage
- Use `className` prop (NativeWind), NOT `style` prop for Tailwind classes
- React Native has no `div`/`span` — use `View`/`Text` with `className`
- Expo Router uses `(group)` notation for layout groups, not folder nesting
- `useLocalSearchParams()` for route params, not `route.params`
- Environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in client code
