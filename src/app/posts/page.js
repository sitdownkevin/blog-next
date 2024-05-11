import Link from "next/link"


import { PostCardCover } from "@/components/PostCard";
import { getMarkdownPostsDataJson } from "@/lib/RenderMarkdown";

  
export default function Posts() {
    const postsData = getMarkdownPostsDataJson();


    return (
        <>
            {/* <menu>Menu TODO</menu> */}
            <div className="grid grid-cols-1 gap-4">
                {postsData.map((post) => (<PostCardCover key={post.slug} post={post} />))}
            </div>
        </>
    )
}