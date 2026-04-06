---
name: type-check
description: Run TypeScript type checking and fix any errors found.
disable-model-invocation: true
---

Run TypeScript type checking and fix all errors:

1. Run `npx tsc --noEmit`
2. If errors found, read each error carefully
3. Fix errors one by one, starting with the first
4. Re-run `npx tsc --noEmit` after each fix
5. Repeat until clean (zero errors)

Do not suppress errors with `@ts-ignore` or `as any` unless absolutely necessary and documented with a comment explaining why.
