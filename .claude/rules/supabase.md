---
paths:
  - "lib/supabase*"
  - "services/**"
  - "supabase/**"
---

# Supabase Patterns

## Client Usage
- Use the singleton client from `@/lib/supabase`
- Never create additional Supabase clients
- Auth uses expo-sqlite localStorage adapter (configured in lib/supabase.ts)

## Type Safety
- All queries must use generated types from `@/types/database.ts`
- Regenerate types after schema changes: `npx supabase gen types typescript`
- Use `Database["public"]["Tables"]["table_name"]["Row"]` for row types
- Define Insert/Update types for mutations

## Query Patterns
```typescript
// Fetch with error handling
const { data, error } = await supabase.from("table").select("*");
if (error) throw error;

// Single row
const { data, error } = await supabase.from("table").select("*").eq("id", id).single();

// Insert
const { data, error } = await supabase.from("table").insert(input).select().single();

// Update
const { data, error } = await supabase.from("table").update(changes).eq("id", id).select().single();
```

## Row Level Security
- Every table MUST have RLS enabled
- Write policies for: SELECT, INSERT, UPDATE, DELETE
- Use `auth.uid()` to scope queries to current user
- Test RLS policies thoroughly — they are your security boundary

## Migrations
- Create migrations: `npx supabase migration new <name>`
- Files go in `supabase/migrations/` with timestamp prefix
- Apply locally: `npx supabase db push`
- Never edit already-applied migrations — create new ones

## Realtime
- Use sparingly — each subscription uses resources
- Unsubscribe in cleanup functions
- Prefer polling (TanStack Query refetchInterval) for non-critical updates
