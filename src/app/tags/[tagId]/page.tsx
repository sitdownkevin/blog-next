import { getMatterList } from "@/lib/posts/getMatterList";
import { PostMatterType } from "@/lib/posts/types";
import { PostCovers } from "@/components/features/posts/PostCover";

export default function TagPage({ params }) {
  const { tagId } = params;
  const matterList: PostMatterType[] = getMatterList();

  // Filter posts by tagId
  const filteredMatterList = matterList.filter((matter) =>
    matter.tags.includes(tagId)
  );

  // Sort the filtered list by update_date
  const sortedFilteredMatterList = filteredMatterList.sort(
    (a, b) => b.update_date.getTime() - a.update_date.getTime()
  );

  console.log("TagPage props:", params);
  console.log("Filtered matter list length:", sortedFilteredMatterList.length);
  return (
    // Apply the width constraint here, replacing w-full and adding mx-auto
    <div className="w-5/6 md:w-2/3 lg:w-1/2 mx-auto flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Posts tagged with "{tagId}"</h1>
      <PostCovers matterList={sortedFilteredMatterList} searching={false} />
    </div>
  );
}