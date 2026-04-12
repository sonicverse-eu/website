import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  cache: {
    enabled: true,
    defaultMaxAge: 3600,
    staleWhileRevalidate: 86400,
  },
});
