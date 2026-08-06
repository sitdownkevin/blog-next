import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

function galleryRemotePatterns(): NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> {
  const patterns: NonNullable<
    NonNullable<NextConfig["images"]>["remotePatterns"]
  > = [
    {
      protocol: "https",
      hostname: "**.r2.dev",
    },
    {
      protocol: "https",
      hostname: "**.r2.cloudflarestorage.com",
    },
  ];

  const publicUrl = process.env.R2_PUBLIC_URL;
  if (publicUrl) {
    try {
      const url = new URL(publicUrl);
      patterns.push({
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        pathname: "/**",
      });
    } catch {
      // ignore invalid R2_PUBLIC_URL at build time
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {},
  images: {
    remotePatterns: galleryRemotePatterns(),
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index.js/ },
      { module: /node_modules\/punycode\/punycode.js/ },
    ];
    return config;
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
