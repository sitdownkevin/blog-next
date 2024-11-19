import { getMarkdownContent, getMarkdownPostsDataJson } from "@/lib/RenderMarkdown"
import { PostCard } from "@/components/PostCard";

export const dynamicParams = false;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const markdownContent = await getMarkdownContent(id);
    return {
        title: `Ke Xu | ${markdownContent.title}`,
    };
}

export default async function Post({ params }) {
    const { id } = await params;
    const markdownContent = await getMarkdownContent(id);

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