import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(path.dirname(__dirname), "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // chunks 大小限制
    assetsInlineLimit: 100 * 1024,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        chunkFileNames: "chunk-[name].[hash].js",
        entryFileNames: "entry-[name].[hash].js",
        manualChunks: {
          lodash: ["lodash"],
          // axios: ["axios"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      //移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: true, //刪除註解
      },
    },
  },
});
