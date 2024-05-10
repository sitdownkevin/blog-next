import Link from "next/link"

import utilStyles from '../../styles/util.module.css';

import { PostCardCover } from "@/components/PostCard";
import { getMarkdownPostsData } from "@/lib/RenderMarkdown";

export default function Posts() {
    const quickRefs = ['Brew', 'PyPI', 'Conda', 'Git']
    const quickRefCards = quickRefs.map((name, index) => ({ name: name, key: index }));

    const postsData = getMarkdownPostsData();

    return (
        <>
            <div className={utilStyles.boxLeft}>
                <div className={utilStyles.gridHorizontal}>
                    {postsData.map((post) => (<PostCardCover key={post.slug} post={post} />))}
                </div>
            </div>
            
        </>
    )
}