import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { encrypt, decrypt } from "./crypto";
import { PostMatterType } from "./types";

const postDirectory = path.join(process.cwd(), "content/posts");

export function getMatterList() {

    const fileNames = fs.readdirSync(postDirectory);
    const matterList = fileNames.map((fileName) => {
        const fileNameWithoutExt = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);
    
        const matterData = {
            id: encrypt(fileNameWithoutExt),
            title: matterResult.data.title,
            tags: matterResult.data.tags ? matterResult.data.tags.split(',') : [],
            description: matterResult.data?.description,
            pinned: matterResult.data?.pinned || false,
            hidden: matterResult.data?.hidden || false,
            create_date: new Date(matterResult.data.create_date),
            update_date: new Date(matterResult.data.update_date),
            content: matterResult.content, // Add content here
        }

        return matterData;
    }) as PostMatterType[]; // Cast to PostMatterType[]

    return matterList;
}
