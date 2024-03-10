#!/bin/bash

echo '>>>>>>>>>>  COMMON'
cd packages/common
rm -rf node_modules
npm install
cd ../../

echo '>>>>>>>>>>  CORE'
cd packages/core

echo $PWD
rm -rf node_modules
rm -rf dist
rm pnpm-lock.yaml

echo $PWD
pnpm i
pnpm build:lib
ech $PWD
# pnpm pack
rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  REACT HOOK'
cd packages/react-hook
rm -rf node_modules
rm -rf dist
rm pnpm-lock.yaml

pnpm i
pnpm build:lib
# pnpm pack
cd ../../

echo '>>>>>>>>>>  REACT'
cd packages/react
rm -rf node_modules
rm -rf dist
rm pnpm-lock.yaml

pnpm i
pnpm build:lib
# pnpm pack
# rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  CoCM'
cd apps/cocm-single-registry
rm -rf node_modules
rm pnpm-lock.yaml

pnpm i
pnpm dev

