import Link from "next/link";
import getMarkdownMatterList from "@/lib/posts/getMarkdownMatter";
import { PostMatter } from "@/lib/posts/types";

export default function Page() {
  const markdownMatterList: PostMatter[] = getMarkdownMatterList();

  return (
    <>
      <div>
        <h1>Posts</h1>
        {markdownMatterList.map((markdownMatter) => (
          <div key={markdownMatter.id}>
            <h2>{markdownMatter.title}</h2>
            <p>{markdownMatter.tags.join(", ")}</p>
            <p>{markdownMatter.create_date.toISOString()}</p>
            <p>{markdownMatter.update_date.toISOString()}</p>
            <p>{markdownMatter.id}</p>
            <Link href={`/posts2/${markdownMatter.id}`}>
              <p>Read More</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
