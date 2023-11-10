'use strict';

var child_process = require('child_process');

var c={npm:["npx"],pnpm:["pnpm","dlx"],yarn1:["npx"],yarn2:["yarn","dlx"]},t=a=>c[a],g=async(a,n)=>{let[e,...r]=t(a);await child_process.spawn(e,[...r,...n],{stdio:"inherit",cwd:process.cwd(),shell:!0});},o=async({packageManager:a="npm"})=>{try{await g(a,["@storybook/auto-config","styling"]);}catch(n){console.error(n),process.exit(1);}},i=o;

module.exports = i;
