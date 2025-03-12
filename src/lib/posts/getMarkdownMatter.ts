import fs from "fs";
import path from "path";
import crypto from "crypto";

// Read Markdown Head
import matter from "gray-matter";
import { PostMatter } from "@/lib/posts/types";

const dataDir = path.join(process.cwd(), "posts");

export default function getMarkdownMatterList(): PostMatter[] {
  try {
    const fileNames = fs.readdirSync(dataDir);
    const markdownMatterList: PostMatter[] = [];

    for (const fileName of fileNames) {
      const name = fileName.replace(/\.md$/, "");
      const fullPath = path.join(dataDir, fileName);
      const markdownContent = fs.readFileSync(fullPath, "utf8");
      const markdownRawMatter = matter(markdownContent).data;

      const markdownMatter: PostMatter = {
        id: crypto.createHash("sha256").update(name).digest("hex"),
        title: markdownRawMatter.title,
        tags: markdownRawMatter.tags.split(" "),
        create_date: new Date(markdownRawMatter.create_date),
        update_date: new Date(markdownRawMatter.update_date),
        hidden: markdownRawMatter?.hidden,
        pinned: markdownRawMatter?.pinned,
      };

      markdownMatterList.push(markdownMatter);
    }

    return markdownMatterList;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}
