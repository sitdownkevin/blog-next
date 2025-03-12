import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createBasePipeline } from "@/lib/markdown-pipeline";
import matter from "gray-matter";

const dataDir = path.join(process.cwd(), "posts");

export default async function getMarkdownMatterContentById(
  id: string
): Promise<string | null> {
  const fileNames = fs.readdirSync(dataDir);
  const fileIds = fileNames.map((fileName) =>
    crypto
      .createHash("sha256")
      .update(fileName.replace(/\.md$/, ""))
      .digest("hex")
  );

  const fileIdIndex = fileIds.findIndex((fileId) => fileId === id);
  if (fileIdIndex === -1) {
    return null;
  }
  const fileName = fileNames[fileIdIndex];
  const fullPath = path.join(dataDir, fileName);

  const markdownText = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(markdownText);
  const markdownContent: string = matterResult.content;

  const pipeline = createBasePipeline();
  const processedContent = await pipeline.process(markdownContent);
  const markdownHtml = processedContent.toString();

  return markdownHtml;
}