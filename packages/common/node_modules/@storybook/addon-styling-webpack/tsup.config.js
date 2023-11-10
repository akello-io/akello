import { defineConfig } from "tsup";

export default defineConfig((options) => [
  {
    entry: ["src/index.ts", "src/preset.ts"],
    splitting: false,
    minify: !options.watch,
    format: ["cjs", "esm"],
    dts: {
      resolve: true,
    },
    treeshake: true,
    sourcemap: true,
    clean: true,
    platform: "browser",
    esbuildOptions(options) {
      options.conditions = ["module"];
    },
  },
  {
    entry: ["src/postinstall.ts"],
    outDir: "./bin",
    splitting: false,
    minify: !options.watch,
    format: ["cjs"],
    treeshake: true,
    target: "node16",
    clean: true,
    platform: "node",
    esbuildOptions(options) {
      options.conditions = ["module"];
    },
  },
]);
