import { Feed } from "feed";
import getMarkdownContentForRss from '@/lib/posts/getMarkdownContentForRss';
import { MarkdownType } from '@/lib/posts/types';


export async function GET() {
  const siteURL = 'https://kexu.win';
  const date = new Date();

  const author = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    link: siteURL,
  };

  const feed = new Feed({
    title: "KE XU's website",
    description: "KE XU's website",
    id: siteURL,
    link: siteURL,
    language: "en",
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date,
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/api/rss`,
    },
    author,
  });

  const posts: MarkdownType[] = await getMarkdownContentForRss();

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${post.id}`,
      link: `${siteURL}/posts/${post.id}`,
      description: post.description || post.title,
      author: [author],
      date: new Date(post.update_date),
    });
  }

  let rss2Content = feed.rss2();


  return new Response(rss2Content, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}