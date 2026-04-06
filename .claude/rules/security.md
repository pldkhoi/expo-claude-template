# Security Rules

These rules apply globally to all files in the project.

## Secrets & API Keys
- NEVER hardcode secrets, API keys, or tokens in source code
- Use environment variables with `EXPO_PUBLIC_` prefix for client-accessible config
- Sensitive server-side keys must NEVER be in client code
- `.env` files are gitignored — use `.env.example` for documentation

## Supabase Security
- ALWAYS use Row Level Security (RLS) policies on every table
- Never bypass RLS with service role key in client code
- Use the anon key (public) in the client — it respects RLS
- Validate all user input before database operations
- Use parameterized queries — never string-concatenate SQL

## Authentication
- Use Supabase Auth for all authentication flows
- Store auth tokens via expo-sqlite localStorage (built-in)
- Check `session` before accessing protected resources
- Handle token expiry and refresh gracefully

## Mobile-Specific
- Sanitize deep link parameters before use
- Don't log sensitive data (tokens, passwords, PII)
- Use HTTPS for all network requests
- Don't store sensitive data in AsyncStorage or plain files
- Be careful with clipboard operations — don't auto-copy sensitive data

## Input Validation
- Validate all user input on both client and server
- Sanitize text before rendering to prevent XSS
- Validate email format, password strength before submission
- Use TypeScript types as first line of defense
