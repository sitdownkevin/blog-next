import type { MetadataRoute } from "next";
import { getMatterList } from "@/lib/posts/getMatterList";
import { getProjectSlugs } from "@/lib/projects/data";
import { menubarComponents } from "@/lib/tools/advanced-search/data";
import { absoluteUrl } from "@/lib/seo/site";
import type { MenubarItem } from "@/lib/types";

function collectAdvancedSearchPaths(items: MenubarItem[]): string[] {
  const paths: string[] = [];
  for (const item of items) {
    if (item.href) {
      paths.push(item.href);
    }
    if (item.subItems?.length) {
      paths.push(...collectAdvancedSearchPaths(item.subItems));
    }
  }
  return paths;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const advancedSearchPaths = collectAdvancedSearchPaths(menubarComponents);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/posts"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getProjectSlugs().map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/about/resume"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about/gallery"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/tools/advanced_search"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...advancedSearchPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    {
      url: absoluteUrl("/tools/gpt_4o_image_prompts"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const posts = (await getMatterList()).filter((matter) => !matter.hidden);
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.id}`),
    lastModified: post.update_date ?? post.create_date ?? now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
