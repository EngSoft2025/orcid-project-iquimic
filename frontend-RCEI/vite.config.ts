import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: parseInt(process.env.PORT || '3000'),
    allowedHosts: [
      'a87d-189-7-87-150.ngrok-free.app' // substitua pelo domínio atual do seu ngrok
    ],
  },
  plugins: [
    react(),
    tsconfigPaths(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    globals: true,
  },
}));