import { getMarkdownContent, getMarkdownPostsDataJson } from "@/lib/RenderMarkdown"
import { PostCard } from "@/components/PostCard";

export const dynamicParams = false;

export async function generateMetadata({ params }) {
    const markdownContent = await getMarkdownContent(params.id);
    return {
        title: `Ke Xu | ${markdownContent.title}`,
    };
}

export default async function Post({ params }) {
    const markdownContent = await getMarkdownContent(params.id);

    return (
        <div>
            <PostCard post={markdownContent}/>
        </div>
    )
}

export async function generateStaticParams() {
    const postData = getMarkdownPostsDataJson();

    return postData.map((post) => {
        return { id: post.id }
    })
}