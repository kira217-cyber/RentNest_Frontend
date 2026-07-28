import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Landlords paste arbitrary property image URLs (see property.images in the
    // backend), so we cannot pin a fixed allowlist of hostnames. Restrict to
    // https only to avoid loading insecure/mixed content through the optimizer.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
