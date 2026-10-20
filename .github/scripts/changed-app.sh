#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/paths.sh"

base="${1:-}"
head="${2:-HEAD}"

# No usable base (first push to a branch, force push): assume the app changed.
if [ -z "$base" ] || ! git cat-file -e "$base^{commit}" 2>/dev/null; then
  echo "app=true"
  exit 0
fi

changed_files=$(git diff --name-only "$base" "$head")

touches() {
  for path in $1; do
    if echo "$changed_files" | grep -q "^$path\(/\|$\)"; then
      return 0
    fi
  done
  return 1
}

echo "app=$(touches "$APP_PATHS" && echo true || echo false)"
