
import Button from "./Button.client";

import { getMarkdownPostsData, getMarkdownContent } from "@/lib/RenderMarkdown";
import { PostCardCover, PostCard } from "@/components/PostCard";


export default async function TestPage() {
    const markdownPostsData = getMarkdownPostsData();
    const content = await getMarkdownContent(markdownPostsData[0].id);

    return (
        <>
            <h1>Debug Page</h1>
            <div>
                {markdownPostsData.map((post) => (
                    <PostCardCover post={post} key={post.id}/>
                ))}
            </div>
        </>
    )
}