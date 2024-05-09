
import Button from "./Button.client";

import { getMarkdownPostsData, getMarkdownContent } from "@/lib/RenderMarkdown";



export default async function TestPage() {
    const markdownPostsData = getMarkdownPostsData();
    const content = await getMarkdownContent(markdownPostsData[0].id);


    return (
        <>
            <h1>Debug Page</h1>
            <div>
                {markdownPostsData.map((post) => (
                    <>
                        <h1>Title: {post.title}</h1>
                        <h2>File Name: {post.id}</h2>
                        <h3>Tags: {post.tags}</h3>
                        <div dangerouslySetInnerHTML={{ __html: content.contentHtml }}></div>
                    </>
                ))}
            </div>
        </>
    )
}