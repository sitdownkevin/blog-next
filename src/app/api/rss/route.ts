import { Feed } from "feed";
import getMarkdownContentForRss from "@/lib/posts/getMarkdownContentForRss";
import { MarkdownType } from "@/lib/posts/types";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo/site";

export async function GET() {
  const date = new Date();

  const author = {
    name: SITE_AUTHOR.name,
    email: SITE_AUTHOR.email,
    link: SITE_URL,
  };

  const feed = new Feed({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    image: absoluteUrl(SITE_OG_IMAGE),
    favicon: absoluteUrl("/favicon.ico"),
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date,
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: absoluteUrl("/api/rss"),
    },
    author,
  });

  const posts: MarkdownType[] = await getMarkdownContentForRss();

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${post.id}`,
      link: absoluteUrl(`/posts/${post.id}`),
      description: post.description || post.title,
      author: [author],
      date: new Date(post.update_date || post.create_date || Date.now()),
    });
  }

  const rss2Content = feed.rss2();

  return new Response(rss2Content, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
