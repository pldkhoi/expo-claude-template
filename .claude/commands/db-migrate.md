---
name: db-migrate
description: Create and apply Supabase database migrations.
disable-model-invocation: true
argument-hint: "[migration-name]"
---

Create and apply a Supabase migration:

1. Create migration file:
   ```bash
   npx supabase migration new $ARGUMENTS
   ```
   This creates a file at `supabase/migrations/[timestamp]_$ARGUMENTS.sql`

2. Write the SQL migration in the created file

3. Apply locally:
   ```bash
   npx supabase db push
   ```

4. Regenerate TypeScript types:
   ```bash
   npx supabase gen types typescript --local > types/database.ts
   ```

5. Run type check: `npx tsc --noEmit`

Rules:
- Always include RLS policies for new tables
- Never modify already-applied migrations — create new ones
- Include both UP and DOWN (CREATE and DROP) considerations
- Test locally before applying to production
