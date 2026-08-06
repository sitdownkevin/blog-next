export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://kexu.win";

export const SITE_NAME = "Ke Xu's website";

export const SITE_DESCRIPTION =
  "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.";

export const SITE_OG_IMAGE = "/og-image.jpg";

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
