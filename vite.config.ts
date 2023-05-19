import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  test: {
    includeSource: ["src/**/*.{js,ts,svelte}"],
    coverage: {
      reporter: ["text", "html"],
      provider: "c8",
    },
    environment: "jsdom",
  },
});
