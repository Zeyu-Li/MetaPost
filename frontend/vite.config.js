import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep Create React App's dev port and output folder so local setup and deploys don't change.
  server: { port: 3000 },
  preview: { port: 3000 },
  build: { outDir: "build" },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
