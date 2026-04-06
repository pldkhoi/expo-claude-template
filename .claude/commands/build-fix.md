---
name: build-fix
description: Diagnose and fix Expo build errors. Run when the app fails to start or build.
disable-model-invocation: true
---

Diagnose and fix build errors:

1. Run `npx tsc --noEmit` to check for TypeScript errors
2. If TypeScript passes, run `npx expo start` to check for runtime issues
3. Read each error message carefully
4. Fix errors one at a time, starting with the first error
5. Re-run after each fix to verify

Common Expo fixes:
- Missing module: `npx expo install [module-name]`
- Metro cache: `npx expo start -c` (clear cache)
- NativeWind issues: check `tailwind.config.js` content paths and `metro.config.js` withNativeWind wrapper
- Native rebuild needed: `npx expo prebuild --clean`
- Type errors: check imports and type definitions
