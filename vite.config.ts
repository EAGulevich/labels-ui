import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import dotenv from "dotenv";
dotenv.config();

const WS_URL = process.env.VITE_WS_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
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
    proxy: {
      "/socket.io": {
        target: WS_URL,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
