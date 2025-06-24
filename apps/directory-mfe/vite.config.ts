import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const { VITE_SERVICE_C_ORIGIN, VITE_APP_FILES_PORT, VITE_SERVICE_A_ENTRY } =
    process.env;

  if (!VITE_SERVICE_A_ENTRY) throw new Error('VITE_SERVICE_A_ENTRY is not defined');

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/directory-mfe",
        filename: "directory.js",
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
      port: +VITE_APP_FILES_PORT! || 8702,
    },
    preview: {
      port: +VITE_APP_FILES_PORT! || 8702,
      allowedHosts: [VITE_SERVICE_C_ORIGIN!],
    },
  };
});
