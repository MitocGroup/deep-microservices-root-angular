#!/usr/bin/env bash

FRAMEWORK_PATH=$(cd "$(dirname "$0")" || exit; pwd -P)
FRAMEWORK_FILE="${FRAMEWORK_PATH}/frontend/js/lib/deep-framework.js"

echo "Installing latest deep-framework from GitHub"
curl -L -XGET https://raw.github.com/MitocGroup/deep-framework/master/src/deep-framework/browser/framework.js -o "${FRAMEWORK_FILE}" -#
