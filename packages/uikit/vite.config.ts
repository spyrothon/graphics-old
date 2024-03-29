import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "../../env",
  envPrefix: "SPYROTHON_",
  css: {
    postcss: resolve(__dirname, "../../tools/postcss"),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "Spyrothon UIKit",
      // the proper extensions will be added
      fileName: "uikit",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "react-router-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-router-dom": "ReactRouterDOM",
        },
      },
    },
  },
});
