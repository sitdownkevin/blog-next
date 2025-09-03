import fs from "fs";
import path from "path";
import { JournalType } from "@/lib/types";

const dataDir = path.join(process.cwd(), "content/data/search");


export async function getData(rule: string): Promise<JournalType[]> {
  const fullPath = path.join(dataDir, `${rule}.json`);
  const data = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(data)["data"];
}


export async function getDescription(
  rule: string
): Promise<{ title: string; link: string }> {
  const fullPath = path.join(dataDir, `${rule}.json`);
  const data = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(data)["source"];
}
