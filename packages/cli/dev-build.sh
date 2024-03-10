#!/bin/bash

cd ..
echo '>>>>>>>>>>  CORE'
cd core

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

cd ..
echo '>>>>>>>>>>  REACT HOOK'
cd react-hook
rm -rf node_modules
rm -rf dist
rm pnpm-lock.yaml

pnpm i
pnpm build:lib
# pnpm pack

cd ..
echo '>>>>>>>>>>  REACT'
cd react

rm -rf node_modules
rm -rf dist
rm pnpm-lock.yaml

pnpm i
pnpm build:lib
# pnpm pack
# rm -rf node_modules



