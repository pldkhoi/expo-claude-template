---
name: deploy
description: Build and submit the app using EAS (Expo Application Services).
disable-model-invocation: true
argument-hint: "[platform: ios|android|all]"
---

Build and deploy using EAS:

1. Verify EAS CLI is available: `npx eas --version`
2. Run type check: `npx tsc --noEmit`
3. Run tests: `npm test`
4. Build for target platform:
   - iOS: `eas build --platform ios`
   - Android: `eas build --platform android`
   - All: `eas build --platform all`
5. Once build completes, submit:
   - iOS: `eas submit --platform ios`
   - Android: `eas submit --platform android`

Default platform from `$ARGUMENTS`, fallback to `all`.

Prerequisites:
- EAS project configured (`eas.json` exists)
- Apple/Google credentials configured
- Run `eas build:configure` first if not set up
