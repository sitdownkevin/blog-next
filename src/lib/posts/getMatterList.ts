import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";
import { encrypt } from "./crypto";
import { parsePostDate } from "./parse-post-date";
import { listPostSlugs, getPostRaw } from "./r2-store";
import { PostMatterType } from "./types";

export async function getMatterList(): Promise<PostMatterType[]> {
  "use cache";
  cacheLife("days");
  cacheTag("posts");

  const slugs = await listPostSlugs();
  const matterList = (
    await Promise.all(
      slugs.map(async (slug) => {
        const fileContents = await getPostRaw(slug);
        if (fileContents === null) return null;

        const matterResult = matter(fileContents);

        return {
          id: encrypt(slug),
          slug,
          title: matterResult.data.title,
          tags: matterResult.data.tags ? matterResult.data.tags.split(",") : [],
          description: matterResult.data?.description,
          pinned: matterResult.data?.pinned || false,
          hidden: matterResult.data?.hidden || false,
          create_date: parsePostDate(matterResult.data.create_date),
          update_date: parsePostDate(matterResult.data.update_date),
          content: matterResult.content,
        } satisfies PostMatterType & { slug: string };
      }),
    )
  ).filter((item): item is NonNullable<typeof item> => item !== null);

  return matterList as PostMatterType[];
}
