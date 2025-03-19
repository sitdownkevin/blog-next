import { Feed } from "feed";
import getMarkdownContentForRss from '@/lib/posts/getMarkdownContentForRss';
import { MarkdownType } from '@/lib/posts/types';


export async function GET() {
  const siteURL = 'https://kevinxu.site'; // 替换为你的网站域名
  const date = new Date();

  const author = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    link: siteURL,
  };

  const feed = new Feed({
    title: "Ke Xu's Blog",
    description: "Ke Xu's Blog",
    id: siteURL,
    link: siteURL,
    language: "zh",
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
      content: post.content,
      author: [author],
      date: new Date(post.update_date),
    });
  }

  let rss2Content = feed.rss2();

  // Insert follow_challenge before the closing </rss> tag
  const followChallenge = `
  <follow_challenge>
        <feedId>82048947524871168</feedId>
        <userId>42175006902104064</userId>
    </follow_challenge>`;

  rss2Content = rss2Content.replace('</rss>', `${followChallenge}\n</rss>`);

  return new Response(rss2Content, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}