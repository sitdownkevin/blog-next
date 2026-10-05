import type { MetadataRoute } from "next";
import { SEO_INDEXABLE, SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";
  const isDev = process.env.NODE_ENV === "development";

  // De-indexed mode: keep the site crawlable so crawlers can read the
  // `noindex` directives, but stop advertising the sitemap. Do NOT add
  // `disallow: "/"` here — a blocked URL can't be dropped from the index.
  if (!SEO_INDEXABLE) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    };
  }

  if (isPreview || isDev) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
