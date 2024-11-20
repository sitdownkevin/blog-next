import { Feed } from 'feed';
import fs from 'fs';
import { getMarkdownPostsDataJson, getMarkdownContent } from './RenderMarkdown.js';

export async function generateRssFeed() {
  const posts = getMarkdownPostsDataJson();
  const siteURL = 'https://kexu567.xyz';
  const date = new Date();

  const author = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    link: "https://kexu567.xyz",
  };

  const feed = new Feed({
    title: "Ke Xu's Blog",
    description: "Ke Xu's personal blog",
    id: siteURL,
    link: siteURL,
    language: "en",
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Ke Xu`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
    },
    author,
  });

  // Add posts to feed
  for (const post of posts) {
    const postContent = await getMarkdownContent(post.id);
    feed.addItem({
      title: post.title,
      id: `${siteURL}/posts/${post.id}`,
      link: `${siteURL}/posts/${post.id}`,
      description: post.title,
      content: postContent.contentHtml,
      author: [author],
      date: post.update_date,
    });
  }

  // Write the RSS feed to a file
  fs.writeFileSync('./public/rss.xml', feed.rss2());
}
