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

// Mirror of SEO_INDEXABLE in src/lib/seo/site.ts. This file is loaded outside
// the app's module resolution, so it reads the env var directly instead of
// importing the shared constant.
const SEO_INDEXABLE = process.env.NEXT_PUBLIC_SEO_INDEXABLE === "true";

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {},
  images: {
    remotePatterns: galleryRemotePatterns(),
  },
  // De-indexed mode: mark every response (HTML pages, public/ files, PDFs,
  // images) as noindex for crawlers that honor response headers.
  async headers() {
    if (SEO_INDEXABLE) {
      return [];
    }
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
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
