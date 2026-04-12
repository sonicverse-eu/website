import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },
  images: {
    unoptimized: true,
    domains: ["localhost", "127.0.0.1"],
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error"]
    } : false,
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
