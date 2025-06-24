import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const {
    VITE_APP_GAMECORE_PORT,
    VITE_SERVICE_D_ORIGIN,
    VITE_SERVICE_A_ENTRY,
    VITE_API_RANK_URL,
    VITE_WS_RANK_URL,
  } = process.env;

  if (!VITE_SERVICE_A_ENTRY) throw new Error('VITE_SERVICE_A_ENTRY is not defined');
  if (!VITE_API_RANK_URL) throw new Error('VITE_API_RANK_URL is not defined');
  if (!VITE_WS_RANK_URL) throw new Error('VITE_WS_RANK_URL is not defined');

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/memory-game-mfe",
        filename: "game.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        remotes: {
          "@dacodes/shell": VITE_SERVICE_A_ENTRY!,
        },
        shared: [
          "@ant-design/icons",
          "@tanstack/react-query",
          "antd",
          "react",
          "react-dom",
        ],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: +VITE_APP_GAMECORE_PORT! || 8703,
    },
    preview: {
      port: +VITE_APP_GAMECORE_PORT! || 8703,
      allowedHosts: [VITE_SERVICE_D_ORIGIN!],
    },
    define: {
      VITE_WS_RANK_URL: JSON.stringify(VITE_WS_RANK_URL),
      VITE_API_RANK_URL: JSON.stringify(VITE_API_RANK_URL),
      VITE_SERVICE_D_ORIGIN: JSON.stringify(VITE_SERVICE_D_ORIGIN),
    },
  };
});
