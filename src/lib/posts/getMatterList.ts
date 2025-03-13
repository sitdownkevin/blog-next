import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { encrypt, decrypt } from "./crypto";
import { PostMatterType } from "./types";

const postDirectory = path.join(process.cwd(), "posts");

export function getMatterList() {

    const fileNames = fs.readdirSync(postDirectory);
    const matterList: PostMatterType[] = fileNames.map((fileName) => {
        const fileNameWithoutExt = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);
    
        const matterData: PostMatterType = {
            id: encrypt(fileNameWithoutExt),
            title: matterResult.data.title,
            tags: matterResult.data.tags.split(','),
            description: matterResult.data?.description,
            pinned: matterResult.data?.pinned,
            hidden: matterResult.data?.hidden,
            create_date: new Date(matterResult.data.create_date),
            update_date: new Date(matterResult.data.update_date),
        }     

        return matterData;
    })

    return matterList;
}
