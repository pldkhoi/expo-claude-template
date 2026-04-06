# Expo + Claude Code Template

A production-ready Expo mobile app template with comprehensive Claude Code configurations for maximum AI-assisted development efficiency.

## Tech Stack

- **Expo SDK 54** + TypeScript (strict mode)
- **Expo Router v6** - file-based routing with typed routes
- **NativeWind v4** - Tailwind CSS for React Native
- **Supabase** - Auth, Database, Row Level Security
- **Zustand** - Client state management
- **TanStack Query v5** - Server state, caching, sync

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url> my-app
cd my-app
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# 3. Start development
npx expo start
```

## Claude Code Configuration

This template includes a complete Claude Code setup:

| Component | Location | Purpose |
|-----------|----------|---------|
| `CLAUDE.md` | Root | Project context for Claude |
| `.claude/settings.json` | `.claude/` | Permissions, hooks, security |
| `.claude/rules/` | 6 files | Code style, testing, security, Expo, Supabase, state |
| `.claude/agents/` | 5 agents | Planner, UI dev, API dev, security reviewer, test writer |
| `.claude/skills/` | 6 skills | Screen, table, component, service, store, TDD |
| `.claude/commands/` | 5 commands | Build-fix, type-check, test, deploy, db-migrate |
| `.claude/hooks/` | 2 hooks | Bash validation, auto-format |
| `.mcp.json` | Root | MCP servers (Context7) |

### Slash Commands

```
/build-fix          # Diagnose and fix build errors
/type-check         # Run tsc and fix type errors
/test [pattern]     # Run tests and fix failures
/deploy [platform]  # EAS build and submit
/db-migrate [name]  # Create Supabase migration
```

### Skills

```
/expo-screen [name] [group]   # Create a new screen
/supabase-table [name]        # Create table + types + hooks
/component [name]             # Create component + test
/api-service [name]           # Create TanStack Query service
/zustand-store [name]         # Create Zustand store
/tdd [feature]                # TDD workflow
```

### Agents

- **planner** - Feature planning and task breakdown (read-only)
- **ui-developer** - NativeWind component and screen creation
- **api-developer** - Supabase and TanStack Query integration
- **security-reviewer** - Security audit (read-only)
- **test-writer** - Jest + RNTL test creation

## Project Structure

```
app/                    # Expo Router pages (file = route)
  (tabs)/               # Tab navigation
  (auth)/               # Auth screens
  _layout.tsx           # Root layout (providers)
components/             # Reusable components
  ui/                   # Primitives (Button, Input, Card)
hooks/                  # Custom React hooks
lib/                    # Core utilities
  supabase.ts           # Supabase client
  queryClient.ts        # TanStack Query client
stores/                 # Zustand stores
services/               # API services (TanStack Query hooks)
types/                  # TypeScript definitions
constants/              # App configuration
.claude/                # Claude Code configuration
  rules/                # Coding rules (6 files)
  agents/               # Agent definitions (5 files)
  skills/               # Skill workflows (6 dirs)
  commands/             # Slash commands (5 files)
  hooks/                # Hook scripts (2 files)
  settings.json         # Permissions and hooks config
```

## Adding MCP Servers

The template ships with Context7 (zero-config). To add more, edit `.mcp.json`:

**GitHub MCP:**
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_TOKEN": "your-token" }
  }
}
```

**Supabase MCP:**
```json
{
  "supabase": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server-supabase", "--read-only"],
    "env": {
      "SUPABASE_ACCESS_TOKEN": "your-access-token"
    }
  }
}
```

## Development Commands

```bash
npx expo start              # Start dev server
npx expo start --ios        # iOS simulator
npx expo start --android    # Android emulator
npm test                    # Run tests
npx tsc --noEmit            # Type check
npx expo lint               # Lint
```

## Conventions

- **Styling**: NativeWind `className` only (no StyleSheet.create)
- **State**: Zustand for client state, TanStack Query for server state
- **Exports**: Named exports (default only for route screens)
- **Types**: Strict TypeScript, no `any`
- **Testing**: Jest + RNTL, behavior-focused
