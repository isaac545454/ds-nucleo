import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/**/*.test.ts",
    "!src/**/*.test.tsx",
    "!src/**/*.stories.ts",
    "!src/**/*.stories.tsx",
  ],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: false,
  splitting: false,
  external: ["react", "react-dom"],
});
