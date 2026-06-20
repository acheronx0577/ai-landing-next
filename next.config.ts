import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
