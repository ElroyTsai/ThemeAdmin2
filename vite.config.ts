import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { VitePWA } from "vite-plugin-pwa";
const __dirname = fileURLToPath(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "ThemeAdmin",
        short_name: "ThemeAdmin",
        theme_color: "#fafafa",
        start_url: ".",
        display: "standalone",
        icons: [
          {
            src: "/vite.svg",
            sizes: "48x48",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(path.dirname(__dirname), "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // chunks 大小限制
    assetsInlineLimit: 100 * 1024,
    cssCodeSplit: true,
    assetsDir: "",
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
