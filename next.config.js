/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Disable webpack persistent cache in dev to prevent vendor-chunk corruption
  // on fast refresh / incremental rebuild.
  webpack(config, { isServer, dev }) {
    if (dev) {
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
};

module.exports = nextConfig;
