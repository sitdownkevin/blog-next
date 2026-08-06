import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { cacheLife } from "next/cache";
import { encrypt } from "./crypto";
import { parsePostDate } from "./parse-post-date";
import { PostMatterType } from "./types";

const postDirectory = path.join(process.cwd(), "content/posts");

export async function getMatterList(): Promise<PostMatterType[]> {
  "use cache";
  cacheLife("days");

  const fileNames = fs.readdirSync(postDirectory);
  const matterList = fileNames.map((fileName) => {
    const fileNameWithoutExt = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const matterData = {
      id: encrypt(fileNameWithoutExt),
      title: matterResult.data.title,
      tags: matterResult.data.tags ? matterResult.data.tags.split(",") : [],
      description: matterResult.data?.description,
      pinned: matterResult.data?.pinned || false,
      hidden: matterResult.data?.hidden || false,
      create_date: parsePostDate(matterResult.data.create_date),
      update_date: parsePostDate(matterResult.data.update_date),
      content: matterResult.content,
    };

    return matterData;
  }) as PostMatterType[];

  return matterList;
}
