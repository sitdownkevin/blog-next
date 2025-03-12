import getMarkdownMatterList from "@/lib/posts/getMarkdownMatter";
import getMarkdownMatterContentById from "@/lib/posts/getMarkdownContent";
import { PostMatter } from "@/lib/posts/types";

export const dynamicParams = false;
export async function generateStaticParams() {
  const markdownMatterList: PostMatter[] = getMarkdownMatterList();

  return markdownMatterList.map((item) => {
    return { id: item.id };
  });
}

export default async function Page({ params }) {
  const { id } = await params;
  const markdownMatterList: PostMatter[] = getMarkdownMatterList();
  const markdownMatter = markdownMatterList.find((item) => item.id === id);
  const markdownContent = await getMarkdownMatterContentById(id);

  return (
    <div>
      <h1>{markdownMatter?.title}</h1>
      <p>{markdownMatter?.tags.join(", ")}</p>
      <p>{markdownMatter?.create_date.toISOString()}</p>
      <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
    </div>
  );
}
