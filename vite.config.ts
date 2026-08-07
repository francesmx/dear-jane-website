import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // Absolute paths are more reliable on Cloudflare Pages / custom domains.
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        support: resolve(__dirname, "support.html"),
        privacy: resolve(__dirname, "privacy-policy.html"),
      },
    },
  },
});
