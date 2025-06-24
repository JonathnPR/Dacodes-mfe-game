import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const { VITE_SERVICE_B_ORIGIN, VITE_APP_USER_PORT, VITE_SERVICE_A_ENTRY } =
    process.env;

  if (!VITE_SERVICE_A_ENTRY) throw new Error('VITE_SERVICE_A_ENTRY is not defined');

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/auth-mfe",
        filename: "auth.js",
        exposes: {
          "./App": "./src/App",
        },
        remotes: {
          "@dacodes/shell": VITE_SERVICE_A_ENTRY!,
        },
        shared: [
          "@ant-design/icons",
          "@tanstack/react-query",
          "antd",
          "lucide-react",
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
      port: +VITE_APP_USER_PORT! || 8701,
    },
    preview: {
      port: +VITE_APP_USER_PORT! || 8701,
      allowedHosts: [VITE_SERVICE_B_ORIGIN!],
    },
  };
});
