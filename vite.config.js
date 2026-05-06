import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    port: 5174,
    host: true,
  },
  build: {
    target: "es2019",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      // Silence harmless "use client" directive warnings from RSC-marked deps
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          /use client/.test(warning.message || "")
        ) {
          return;
        }
        warn(warning);
      },
      output: {
        // Split heavy vendor libs into their own chunks so the main bundle
        // stays small and routes can lazy-load only what they need.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-dom") || id.includes("react-router"))
            return "react-vendor";
          if (id.includes("@reduxjs") || id.includes("redux")) return "redux";
          if (id.includes("framer-motion")) return "framer";
          if (id.includes("d3")) return "d3";
          if (id.includes("recharts")) return "recharts";
          if (id.includes("@stripe")) return "stripe";
          if (
            id.includes("react-big-calendar") ||
            id.includes("date-fns") ||
            id.includes("moment")
          )
            return "calendar";
          if (id.includes("swiper")) return "swiper";
          if (
            id.includes("@react-google-maps") ||
            id.includes("react-leaflet")
          )
            return "maps";
          if (id.includes("react-icons")) return "icons";
          if (id.includes("react-select")) return "select";
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
