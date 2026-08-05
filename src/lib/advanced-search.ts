import fs from "fs";
import path from "path";
import { cacheLife } from "next/cache";
import { JournalType } from "@/lib/types";

const dataDir = path.join(process.cwd(), "content/data/search");

export async function getData(rule: string): Promise<JournalType[]> {
  "use cache";
  cacheLife("days");

  const fullPath = path.join(dataDir, `${rule}.json`);
  const data = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(data)["data"];
}

export async function getDescription(
  rule: string,
): Promise<{ title: string; link: string }> {
  "use cache";
  cacheLife("days");

  const fullPath = path.join(dataDir, `${rule}.json`);
  const data = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(data)["source"];
}
