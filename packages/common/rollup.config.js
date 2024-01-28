import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: 'json'}
import nodePolyfills from "rollup-plugin-node-polyfills";
import nodeGlobals from "rollup-plugin-node-globals";


export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],        
        plugins: [
            peerDepsExternal(),
            nodeGlobals(),
            resolve(),
            json(),
            commonjs({
                include: /node_modules/,
                requireReturnsDefault: 'auto'
            }),
            nodePolyfills({            
                crypto: false,
                os: false,
                zlib: false,
                tty: false,
                stream: false,
                https: false,
                http: false,
                process: false                
            }),
            typescript({ tsconfig: "./tsconfig.json", sourceMap: false }),
            postcss(),
        ],
        external: ['react', 'react-dom', '@types/react']
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [
            dts()
        ],
        external: [/\.(css|less|scss)$/],
    },
];