#!/bin/bash

echo '>>>>>>>>>>  COMMON'
cd packages/common
rm -rf node_modules
npm install
cd ../../

echo '>>>>>>>>>>  CORE'
cd packages/core
rm -rf node_modules
rm -rf dist
npm install
npm run build
# rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  REACT'
cd packages/react
rm -rf node_modules
rm -rf dist
pnpm install  --save-dev husky
pnpm install  --save @types/react
pnpm install --save @mui/x-data-grid
pnpm install --save classnames
pnpm install --save vite
pnpm install --save @vitejs/plugin-react
pnpm install --save vitest
pnpm install --save vite-plugin-dts
pnpm install --save tailwindcss
pnpm install --save @emotion/react
pnpm install --save @emotion/styled
pnpm install --save @mui/material
pnpm install --save @testing-library/react
pnpm install --save json
pnpm install --save @mui/styled-engine
pnpm i
pnpm build:lib
pnpm pack
# rm -rf node_modules
cd ../../
