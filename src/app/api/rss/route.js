import { Feed } from 'feed';
import { getMarkdownPostsDataJson, getMarkdownContent } from '@/lib/RenderMarkdown';

export async function GET() {
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

    // Generate RSS 2.0 feed
    const rss2Content = feed.rss2();
    
    // Insert follow_challenge before the closing </rss> tag
    const followChallenge = `
    <follow_challenge>
        <feedId>82048947524871168</feedId>
        <userId>42175006902104064</userId>
    </follow_challenge>`;
    
    const modifiedRss = rss2Content.replace('</rss>', `${followChallenge}\n</rss>`);

    // Return the feed as RSS 2.0
    return new Response(modifiedRss, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
