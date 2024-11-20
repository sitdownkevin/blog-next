import { Feed } from 'feed';
import { getMarkdownPostsDataJson, getMarkdownContent } from '@/lib/RenderMarkdown';

const SITE_URL = 'https://kexu567.xyz';
const AUTHOR = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    link: SITE_URL,
};

async function generateFeed() {
    const posts = getMarkdownPostsDataJson();
    const date = new Date();

    const feed = new Feed({
        title: "Ke Xu's Blog",
        description: "Ke Xu's personal blog",
        id: SITE_URL,
        link: SITE_URL,
        language: "en",
        image: `${SITE_URL}/favicon.ico`,
        favicon: `${SITE_URL}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, Ke Xu`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${SITE_URL}/api/rss`,
        },
        author: AUTHOR,
    });

    // Add posts to feed
    for (const post of posts) {
        const postContent = await getMarkdownContent(post.id);
        feed.addItem({
            title: post.title,
            id: `${SITE_URL}/posts/${post.id}`,
            link: `${SITE_URL}/posts/${post.id}`,
            description: post.title,
            content: postContent.contentHtml,
            author: [AUTHOR],
            date: post.update_date,
        });
    }

    return feed;
}

export async function GET() {
    const feed = await generateFeed();
    
    return new Response(feed.rss2(), {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
        },
    });
}
