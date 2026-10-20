#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/paths.sh"

# Short sha of the last commit that touched the application. CD tags the image
# sha-<this>, so an unchanged application resolves to an image that already
# exists and the build is skipped. Needs full history (fetch-depth: 0).
echo "app=$(git log -1 --abbrev=7 --format=%h -- $APP_PATHS)"
