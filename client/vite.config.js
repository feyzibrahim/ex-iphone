import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "./src/Common"),
      "@redux": path.resolve(__dirname, "./src/redux"),
    },
  },
  build: {
    rollupOptions: {
      external: ["yup"], // Add 'yup' or the actual module name here
    },
  },
});
