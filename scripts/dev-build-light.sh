#!/bin/bash

echo '>>>>>>>>>>  COMMON'
cd packages/common
rm -rf node_modules
npm install
cd ../../

echo '>>>>>>>>>>  CORE'
cd packages/core
pnpm build:lib
pnpm pack
cd ../../



echo '>>>>>>>>>>  REACT HOOK'
cd packages/react-hook
pnpm build:lib
pnpm pack
cd ../../


echo '>>>>>>>>>>  REACT'
cd packages/react
pnpm build:lib
pnpm pack
# rm -rf node_modules
cd ../../


echo '>>>>>>>>>>  CoCM'
cd apps/cocm-registry
pnpm i
pnpm start