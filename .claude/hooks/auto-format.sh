#!/bin/bash
# PostToolUse hook: Auto-format written/edited TypeScript files with Prettier

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path' 2>/dev/null)

# If no file path, skip
if [ -z "$FILE_PATH" ] || [ "$FILE_PATH" = "null" ]; then
  exit 0
fi

# Only format TypeScript/JavaScript files
if [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]]; then
  cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
  npx prettier --write "$FILE_PATH" 2>/dev/null || true
fi

exit 0
