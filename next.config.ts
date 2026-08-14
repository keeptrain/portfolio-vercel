import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"] as const,
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
