import Link from "next/link"

import utilStyles from '../../styles/util.module.css';

import { PostCardCover } from "@/components/PostCard";
import { getMarkdownPostsData } from "@/lib/RenderMarkdown";

export default function Posts() {
    const postsData = getMarkdownPostsData();

    return (
        <>
            {/* <menu>Menu TODO</menu> */}
            <div className="grid grid-cols-1 gap-4">
                {postsData.map((post) => (<PostCardCover key={post.slug} post={post} />))}
            </div>
        </>
    )
}