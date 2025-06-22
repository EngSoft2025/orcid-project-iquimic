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
    proxy: {
      "/orcid": {
        target: "https://pub.orcid.org",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/orcid/, "/v3.0"),
      },
    },
    port: parseInt(process.env.PORT || '3000'),
    allowedHosts: [
      '708b-2804-14d-8084-950d-00-1001.ngrok-free.app' // substitua pelo domínio atual do seu ngrok
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