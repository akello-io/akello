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
rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  REACT'
cd packages/react
rm -rf node_modules
rm -rf dist
npm install
npm run build
rm -rf node_modules
cd ../../


echo '>>>>>>>>>>  INSIGHTS'
cd packages/react-insights
rm -rf node_modules
rm -rf dist
npm install
npm run build
rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  MEDICAL'
cd packages/react-medical
rm -rf node_modules
rm -rf dist
npm install
npm run build
rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  APPS'
cd apps/akello-app
rm -rf node_modules
npm install