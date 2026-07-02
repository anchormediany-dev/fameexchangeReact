import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],

  server: {
    port: 5174,
    host: true,
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },

  build: {
    target: "es2020",
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-redux": ["redux", "@reduxjs/toolkit", "react-redux", "redux-persist"],
          "vendor-ui": ["framer-motion", "react-toastify"],
          "vendor-stripe": ["@stripe/react-stripe-js", "@stripe/stripe-js"],
        },
      },
    },
  },
});
