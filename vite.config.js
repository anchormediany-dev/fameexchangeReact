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
});
