import { PostCardCover } from "@/components/PostCard";
import { getMarkdownPostsDataJson } from "@/lib/RenderMarkdown";

export const metadata = {
    title: "Ke Xu | Posts",
};


export default function Posts() {
    const postsData = getMarkdownPostsDataJson();

    return (
        <>
            <div className="grid grid-cols-1 w-full">
                {postsData.map((post) => (
                    <PostCardCover key={post.slug} post={post} />
                ))}
            </div>
        </>
    );
}