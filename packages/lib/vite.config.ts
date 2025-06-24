import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      name: "@dacodes/lib",
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["cjs", "es"],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
