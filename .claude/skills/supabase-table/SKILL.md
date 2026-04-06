---
name: supabase-table
description: Create a new Supabase table with SQL migration, TypeScript types, RLS policies, and TanStack Query hooks. Triggers when user asks to create a database table or entity.
argument-hint: "[table-name]"
---

Create a complete Supabase table setup for `$ARGUMENTS`:

## Steps

1. **Create SQL migration** at `supabase/migrations/[timestamp]_create_[name].sql`:

```sql
-- Create table
CREATE TABLE IF NOT EXISTS public.[table_name] (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
  -- Add columns here
);

-- Enable RLS
ALTER TABLE public.[table_name] ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data" ON public.[table_name]
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON public.[table_name]
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON public.[table_name]
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" ON public.[table_name]
  FOR DELETE USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_[table_name]_updated_at
  BEFORE UPDATE ON public.[table_name]
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

2. **Add TypeScript types** to `types/database.ts`:
   - Row type (all columns)
   - Insert type (optional id, timestamps)
   - Update type (all optional)

3. **Create TanStack Query service** at `services/[name].ts`:
   - Query key factory
   - `useList()` hook with `useQuery`
   - `useDetail(id)` hook with `useQuery`
   - `useCreate()` hook with `useMutation` + invalidation
   - `useUpdate()` hook with `useMutation` + invalidation
   - `useDelete()` hook with `useMutation` + invalidation

4. **Run type check**: `npx tsc --noEmit`

## Rules
- ALWAYS enable RLS on the table
- ALWAYS scope policies to `auth.uid()`
- Use UUID for primary keys
- Include `created_at` and `updated_at` timestamps
- Create the `supabase/migrations/` directory if it doesn't exist
