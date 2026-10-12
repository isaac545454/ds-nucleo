import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.mjs"],
    exclude: [...configDefaults.exclude, "src/components/a11y.test.tsx"],
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.tsx", "src/lib/**/*.ts"],
      exclude: ["src/**/*.stories.tsx"],
    },
  },
});
