import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/enterprise-ux-motion-lab/",
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        dashboard: resolve(root, "index.html"),
        engineering: resolve(root, "engineering/index.html"),
        userGuide: resolve(root, "user-guide/index.html")
      }
    }
  },
  test: {
    environment: "jsdom",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "e2e/**"
    ],
    fileParallelism: false,
    globals: true,
    maxWorkers: 1,
    pool: "vmThreads",
    setupFiles: ["src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage",
      exclude: [
        "coverage/**",
        "dist/**",
        "docs/**",
        "e2e/**",
        "playwright.config.ts",
        "src/main.tsx",
        "src/test/**",
        "vite.config.ts"
      ]
    }
  }
});
