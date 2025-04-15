import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("src/assets/startAnimationLogo.js")) {
            return "startAnimation"; // Имя чанка для этого файла
          }
        },
      },
    },
  },
  server: {
    port: 8000,
  },
});
