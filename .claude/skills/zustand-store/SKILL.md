---
name: zustand-store
description: Create a Zustand store with TypeScript types, actions, and optional persistence middleware. Triggers when user asks to create a store or manage client state.
argument-hint: "[store-name]"
---

Create a Zustand store for `$ARGUMENTS`:

## Steps

1. **Create store file** at `stores/[name]Store.ts`:

```typescript
import { create } from "zustand";

interface [Name]State {
  // State
  items: Item[];
  isLoading: boolean;

  // Actions
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

const initialState = {
  items: [],
  isLoading: false,
};

export const use[Name]Store = create<[Name]State>((set, get) => ({
  ...initialState,

  setItems: (items) => set({ items }),

  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  reset: () => set(initialState),
}));
```

2. **If persistence is needed**, wrap with `persist` middleware:

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const use[Name]Store = create<[Name]State>()(
  persist(
    (set, get) => ({
      // ... same as above
    }),
    {
      name: "[name]-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

3. **Run type check**: `npx tsc --noEmit`

## Rules
- One store per domain concern
- Define state AND actions in the same interface
- Provide a `reset()` action for cleanup
- Use `initialState` constant for easy reset
- Client state ONLY — use TanStack Query for server data
- Access outside React: `use[Name]Store.getState()`
- Follow patterns from `stores/authStore.ts`
