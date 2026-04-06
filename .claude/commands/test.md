---
name: test
description: Run the test suite and fix any failures.
disable-model-invocation: true
argument-hint: "[optional: test file pattern]"
---

Run tests and fix any failures:

1. Run `npm test $ARGUMENTS`
2. If tests fail, read each failure message
3. Determine if the fix is in the test or the source code
4. Fix and re-run until all tests pass
5. Run `npx tsc --noEmit` to ensure type safety

If `$ARGUMENTS` is provided, only run matching tests:
`npm test -- --testPathPattern="$ARGUMENTS"`
