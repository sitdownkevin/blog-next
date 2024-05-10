import { getMarkdownContent, getMarkdownPostsData } from "@/lib/RenderMarkdown"
import { PostCard } from "@/components/PostCard";

export const dynamicParams = false;

export default async function Post({ params }) {
    const markdownContent = await getMarkdownContent(params.id);

    return (
        <div>
            <PostCard post={markdownContent}/>
        </div>
    )
}

export async function generateStaticParams() {
    const postData = getMarkdownPostsData();

    return postData.map((post) => {
        return { id: post.id }
    })
}