#!/bin/bash

set -ex

# Prepare source files.
esbuild main.js --bundle --platform=node --outfile=out/eslint-src.js

# Prepare binaries.
pkg -t node20-macos-arm64,node20-macos-x64,node20-linux-arm64,node20-linux-x64 out/eslint-src.js -o out/eslint

# Archive binaries.
tar -czvf out/eslint-linux-arm64.tar.gz out/eslint-linux-arm64
tar -czvf out/eslint-linux-x64.tar.gz out/eslint-linux-x64
tar -czvf out/eslint-macos-arm64.tar.gz out/eslint-macos-arm64
tar -czvf out/eslint-macos-x64.tar.gz out/eslint-macos-x64
