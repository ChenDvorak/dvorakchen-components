import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import pkg from "./package.json";
import dts from "vite-plugin-dts";

const OUTPUT_FILE_NAME = "index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DvorakComponents",
      fileName: OUTPUT_FILE_NAME,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies)],
    },
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
