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
rm pnpm-lock.yaml
pnpm install  --save-dev husky
pnpm install  --save-dev @types/react
pnpm install  --save-dev @types/react-dom
pnpm install --save-dev sass
pnpm install --save classnames
pnpm install --save vite
pnpm install --save vite-plugin-dts
pnpm install --save @vitejs/plugin-react
pnpm install --save vitest
pnpm install --save json
pnpm install --save-peer tailwindcss

pnpm i
pnpm build:lib
pnpm pack
# rm -rf node_modules
cd ../../



echo '>>>>>>>>>>  REACT HOOK'
cd packages/react-hook
rm -rf node_modules
rm -rf dist
rm pnpm-lock.yaml

pnpm install  --save-dev husky
pnpm install  --save-dev storybook
pnpm install  --save-dev @storybook/react-vite
pnpm install  --save-dev @storybook/react
pnpm install --save-dev @heroicons/react
pnpm install --save-peer ../core/akello-core-2.0.4.tgz
pnpm install  --save @types/react
pnpm install --save classnames
pnpm install --save vite
pnpm install --save vite-plugin-dts
pnpm install --save @vitejs/plugin-react
pnpm install --save vitest
pnpm install --save json
pnpm install --save-peer tailwindcss
pnpm install --save amazon-cognito-identity-js

pnpm i
pnpm build:lib
pnpm pack
cd ../../


echo '>>>>>>>>>>  REACT'
cd packages/react
rm -rf node_modules
rm -rf dist
rm pnpm-lock.yaml

pnpm install  --save-dev husky
pnpm install  --save-dev storybook
pnpm install  --save-dev @storybook/react-vite
pnpm install  --save-dev @storybook/react
pnpm install --save-dev @heroicons/react
pnpm install  --save @types/react
pnpm install --save classnames
pnpm install --save vite
pnpm install --save @vitejs/plugin-react
pnpm install --save vitest
pnpm install --save vite-plugin-dts
pnpm install --save @emotion/react
pnpm install --save @emotion/styled
pnpm install --save @testing-library/react
pnpm install --save json
pnpm install --save recharts
pnpm install --save @headlessui/react
pnpm install --save-peer @mui/material
pnpm install --save-peer @mui/styled-engine
pnpm install --save-peer tailwindcss
pnpm install --save-peer postcss
pnpm install --save-peer autoprefixer
pnpm install --save-peer @mui/x-data-grid
pnpm install --save-peer daisyui
pnpm install --save yup
pnpm install --save formik

pnpm install --save-peer ../react-hook/akello-react-hook-2.0.4.tgz
pnpm install --save-peer ../core/akello-core-2.0.4.tgz
pnpm install @storybook/addon-essentials --save-dev

pnpm i
pnpm build:lib
pnpm pack
# rm -rf node_modules
cd ../../


echo '>>>>>>>>>>  CoCM'
cd apps/cocm-registry
rm -rf node_modules
rm pnpm-lock.yaml

pnpm install ../../packages/core/akello-core-2.0.4.tgz
pnpm install ../../packages/react-hook/akello-react-hook-2.0.4.tgz
pnpm install ../../packages/react/akello-react-2.0.4.tgz

pnpm i
pnpm start