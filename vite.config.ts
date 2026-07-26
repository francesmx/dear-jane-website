import { defineConfig } from "vite";

export default defineConfig({
  // Absolute paths are more reliable on Cloudflare Pages / custom domains.
  base: "/",
});
