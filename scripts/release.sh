#!/bin/bash

set -e

# Restore all git changes
git restore -s@ -SW  -- packages

# Build all once to ensure things are nice
pnpm build

# Release packages
for PKG in packages/* ; do
  pushd $PKG

  TAG="latest"
  echo "⚡ Publishing $PKG with tag $TAG"
  cp ../../LICENSE .
  sed -i.bak 's/\(\.\/\|\.\.\/.\.\.\/\)\.github\/assets/https:\/\/github.com\/leoboyerbx\/layout-aid\/tree\/main\/\.github\/assets/g' README.md
  pnpm publish --access public --no-git-checks --tag $TAG

  popd > /dev/null
done

mv README.md.bak README.md