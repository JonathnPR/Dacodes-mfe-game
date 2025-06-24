import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const {
    VITE_SERVICE_A_ORIGIN,
    VITE_APP_GATEWAY_PORT,
    VITE_EXT_DATA_API,
    VITE_SERVICE_B_ENTRY,
    VITE_SERVICE_C_ENTRY,
    VITE_SERVICE_D_ENTRY,
    VITE_SERVICE_E_ENTRY,
  } = process.env;

  if (!VITE_SERVICE_B_ENTRY) throw new Error('VITE_SERVICE_B_ENTRY is not defined');
  if (!VITE_SERVICE_C_ENTRY) throw new Error('VITE_SERVICE_C_ENTRY is not defined');
  if (!VITE_SERVICE_D_ENTRY) throw new Error('VITE_SERVICE_D_ENTRY is not defined');
  if (!VITE_SERVICE_E_ENTRY) throw new Error('VITE_SERVICE_E_ENTRY is not defined');

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/shell",
        filename: "root.js",
        exposes: {
          "./App": "./src/App",
          "./AppProvider": "./src/components/AppProvider",
          "./queryClient": "./src/config/query.client",
          "./httpClient": "./src/config/http.client",
          "./useNotify": "./src/hooks/useNotify",
        },
        remotes: {
          "@dacodes/auth-mfe": VITE_SERVICE_B_ENTRY!,
          "@dacodes/directory-mfe": VITE_SERVICE_C_ENTRY!,
          "@dacodes/memory-game-mfe": VITE_SERVICE_D_ENTRY!,
          "@dacodes/profile-mfe": VITE_SERVICE_E_ENTRY!,
        },
        shared: [
          "axios",
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
      port: +VITE_APP_GATEWAY_PORT! || 8700,
    },
    preview: {
      port: +VITE_APP_GATEWAY_PORT! || 8700,
      allowedHosts: [VITE_SERVICE_A_ORIGIN!],
    },
    define: {
      VITE_EXT_DATA_API: JSON.stringify(VITE_EXT_DATA_API),
    },
  };
});
