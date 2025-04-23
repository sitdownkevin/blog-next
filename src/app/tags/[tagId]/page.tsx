import { getMatterList } from "@/lib/posts/getMatterList";
import { PostMatterType } from "@/lib/posts/types";
import { PostCovers } from "@/components/posts/PostCover";

interface TagPageProps {
  params: {
    tagId: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
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

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Posts tagged with "{tagId}"</h1>
      <PostCovers matterList={sortedFilteredMatterList} />
    </div>
  );
}