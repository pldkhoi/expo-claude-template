#!/bin/bash
# PreToolUse hook: Validate bash commands before execution
# Exit 0 = allow, Exit 2 = block

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command' 2>/dev/null)

# If jq fails or no command, allow
if [ -z "$CMD" ] || [ "$CMD" = "null" ]; then
  exit 0
fi

# Block yarn/pnpm — enforce npm
if echo "$CMD" | grep -qE '^(yarn|pnpm)\s'; then
  echo "BLOCKED: This project uses npm. Please use npm instead of yarn/pnpm." >&2
  exit 2
fi

# Block rm -rf (suggest safer alternatives)
if echo "$CMD" | grep -qE '\brm\s+.*-[a-zA-Z]*r[a-zA-Z]*f|rm\s+.*-[a-zA-Z]*f[a-zA-Z]*r'; then
  echo "BLOCKED: rm -rf is dangerous. Use specific file paths or the trash command instead." >&2
  exit 2
fi

# Block direct push to main/master
if echo "$CMD" | grep -qE 'git\s+push\s+.*(main|master)(\s|$)'; then
  echo "BLOCKED: Direct push to main/master is not allowed. Use a feature branch and create a PR." >&2
  exit 2
fi

exit 0
