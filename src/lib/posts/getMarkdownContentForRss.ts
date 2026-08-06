import matter from "gray-matter";
import { decrypt } from "@/lib/posts/crypto";
import { MarkdownType, PostMatterType } from "./types";
import { createBasePipeline } from "@/lib/posts/markdownPipeline";
import { getMatterList } from "@/lib/posts/getMatterList";
import { parsePostDate } from "./parse-post-date";
import { getPostRaw } from "./r2-store";

async function getMarkdownContent(postId: string): Promise<MarkdownType> {
  const fileNameWithoutExt = await decrypt(postId);
  if (fileNameWithoutExt === "404") {
    throw new Error(`Post not found: ${postId}`);
  }

  const fileContents = await getPostRaw(fileNameWithoutExt);
  if (fileContents === null) {
    throw new Error(`Post not found: ${postId}`);
  }

  const matterResult = matter(fileContents);

  const pipeline = createBasePipeline();
  const contentProcessed = await pipeline.process(matterResult.content);
  const contentHtml: string = contentProcessed.toString();

  return {
    content: contentHtml,
    id: postId,
    title: matterResult.data.title,
    tags: matterResult.data.tags.split(","),
    description: matterResult.data.description,
    create_date: parsePostDate(matterResult.data.create_date),
    update_date: parsePostDate(matterResult.data.update_date),
  };
}

export default async function getMarkdownContentForRss(): Promise<
  MarkdownType[]
> {
  let matterList: PostMatterType[] = await getMatterList();
  matterList = matterList.filter((item) => item.hidden !== true);
  const postIds = matterList.map((item) => item.id);
  const posts = await Promise.all(postIds.map(getMarkdownContent));

  return posts;
}
