---
paths:
  - "stores/**"
  - "services/**"
  - "hooks/**"
---

# State Management Rules

## Core Principle
**Zustand = client state. TanStack Query = server state. Never mix them.**

## Zustand (Client State)
Use for: UI toggles, auth session, navigation state, user preferences, form drafts

```typescript
// Pattern: stores/nameStore.ts
import { create } from "zustand";

interface NameState {
  value: string;
  setValue: (value: string) => void;
}

export const useNameStore = create<NameState>((set) => ({
  value: "",
  setValue: (value) => set({ value }),
}));
```

### Zustand Guidelines
- One store per domain (authStore, uiStore, settingsStore)
- Define state interface AND actions in the same interface
- Use `persist` middleware for data that survives app restarts
- Keep stores small and focused
- Access store outside React with `useNameStore.getState()`

## TanStack Query (Server State)
Use for: All data from Supabase/APIs — lists, details, search results

```typescript
// Pattern: services/name.ts
const nameKeys = {
  all: ["names"] as const,
  lists: () => [...nameKeys.all, "list"] as const,
  detail: (id: string) => [...nameKeys.all, "detail", id] as const,
};

export function useNameList() {
  return useQuery({
    queryKey: nameKeys.lists(),
    queryFn: async () => { /* supabase query */ },
  });
}

export function useCreateName() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateInput) => { /* supabase insert */ },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: nameKeys.lists() });
    },
  });
}
```

### TanStack Query Guidelines
- Use query key factories for consistent cache management
- Always invalidate related queries after mutations
- Use `enabled` option to conditionally run queries
- Handle loading/error states in components
- Configure staleTime and gcTime per query when needed

## Anti-Patterns to Avoid
- Storing API response data in Zustand (use TanStack Query)
- Duplicating server data in client state
- Manual refetching instead of query invalidation
- Global loading states instead of per-query loading
