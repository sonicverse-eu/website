import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  cache: {
    enabled: true,
    defaultMaxAge: 3600,
    staleWhileRevalidate: 86400,
  },
  images: {
    domains: ["localhost", "127.0.0.1"],
  },
  experimental: {
    disableEdgeRuntime: false,
    enableEdgeFunctions: true,
  },
});
