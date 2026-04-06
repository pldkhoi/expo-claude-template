---
name: api-service
description: Create an API service with TanStack Query hooks for data fetching and mutations from Supabase. Triggers when user asks to create a service, API hook, or data layer.
argument-hint: "[service-name]"
---

Create a TanStack Query service for `$ARGUMENTS`:

## Steps

1. **Create service file** at `services/[name].ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Query key factory
const [name]Keys = {
  all: ["[name]s"] as const,
  lists: () => [...[name]Keys.all, "list"] as const,
  detail: (id: string) => [...[name]Keys.all, "detail", id] as const,
};

// Types
interface [Name] {
  id: string;
  created_at: string;
  // Add fields
}

interface Create[Name]Input {
  // Add input fields
}

// Hooks
export function use[Name]List() {
  return useQuery({
    queryKey: [name]Keys.lists(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("[name]s")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as [Name][];
    },
  });
}

export function use[Name]Detail(id: string) {
  return useQuery({
    queryKey: [name]Keys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("[name]s")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as [Name];
    },
    enabled: !!id,
  });
}

export function useCreate[Name]() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Create[Name]Input) => {
      const { data, error } = await supabase
        .from("[name]s")
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data as [Name];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [name]Keys.lists() });
    },
  });
}
```

2. **Add types** to `types/database.ts` if not already present

3. **Run type check**: `npx tsc --noEmit`

## Rules
- Always create query key factories for cache management
- Always invalidate related queries after mutations
- Use `enabled` option for conditional queries
- Type all return values
- Handle errors with `if (error) throw error`
- Follow patterns from `services/example.ts`
