import { getMatterList } from "@/lib/posts/getMatterList";
import { PostMatterType } from "@/lib/posts/types";
import { PostCover } from "@/components/posts/PostCover";
import { PostCovers } from "@/components/posts/PostCover";


export default function Page() {
    const matterList: PostMatterType[] = getMatterList();
    const matterListNotHidden: PostMatterType[] = matterList.filter((matter) => !matter.hidden);
    
    // Split into pinned and unpinned posts
    const pinnedPosts = matterListNotHidden.filter((matter) => matter.pinned);
    const unpinnedPosts = matterListNotHidden.filter((matter) => !matter.pinned);
    
    // Sort both arrays by date
    const pinnedSorted = pinnedPosts.sort((a, b) => b.update_date.getTime() - a.update_date.getTime());
    const unpinnedSorted = unpinnedPosts.sort((a, b) => b.update_date.getTime() - a.update_date.getTime());
    
    // Combine the arrays with pinned posts first
    const matterListSorted = [...pinnedSorted, ...unpinnedSorted];

    return (
        <div className="w-full flex flex-col">
            {/* {matterListSorted.map((matter, index) => (
                <PostCover key={matter.id} matter={matter} first={index === 0} />
            ))} */}
            <PostCovers matterList={matterListSorted} />
        </div>
    )
}