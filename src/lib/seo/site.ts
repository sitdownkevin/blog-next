export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://kexu.win";

export const SITE_NAME = "Ke Xu's website";

export const SITE_DESCRIPTION =
  "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.";

export const SITE_OG_IMAGE = "/og-image.jpg";

// Site-wide indexing switch. Off by default: the site serves `noindex` to all
// search engines. To re-enable indexing, set NEXT_PUBLIC_SEO_INDEXABLE=true in
// Vercel and redeploy. Keep this in sync with next.config.ts (which cannot
// import this module because path aliases don't resolve there).
export const SEO_INDEXABLE = process.env.NEXT_PUBLIC_SEO_INDEXABLE === "true";

// Google Search Console ownership proof (HTML tag method). Search Console
// re-checks periodically, so this must stay in the page forever.
export const GOOGLE_SITE_VERIFICATION =
  "ty_Edz-GlpmZtQRxE23apEADiK5cP8jG5SlPdczvb1s";

// Bing Webmaster Tools ownership proof (HTML meta tag method). Keep this
// alongside the Google verification tag so the site remains verifiable.
export const BING_SITE_VERIFICATION = "5BFADA5B25E32E2EF27ACACA9458DAA5";

export const SITE_AUTHOR = {
  name: "Ke Xu",
  email: "kexu567@gmail.com",
  github: "sitdownkevin",
  githubUrl: "https://github.com/sitdownkevin",
  jobTitle: "Ph.D. candidate in Information Systems",
  affiliation: "Tongji University",
} as const;

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") {
    return SITE_URL;
  }
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
