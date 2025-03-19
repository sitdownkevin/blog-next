import fs from 'fs';
import path from 'path';
import { decrypt, encrypt } from '@/lib/posts/crypto';
import matter from 'gray-matter';
import { MarkdownType, PostMatterType } from './types';
import { createBasePipeline } from '@/lib/posts/markdownPipeline';
import { getMatterList } from '@/lib/posts/getMatterList';

const postsDirectory = path.join(process.cwd(), 'posts');


async function getMarkdownContent(postId: string): Promise<MarkdownType> {
    const fileNameWithoutExt = decrypt(postId);
    const fullPath = path.join(postsDirectory, `${fileNameWithoutExt}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const pipeline = createBasePipeline();
    const contentProcessed = await pipeline.process(matterResult.content);
    let contentHtml: string = contentProcessed.toString();


    return {
        content: contentHtml,
        id: postId,
        title: matterResult.data.title,
        tags: matterResult.data.tags.split(','),
        description: matterResult.data.description,
        create_date: new Date(matterResult.data.create_date),
        update_date: new Date(matterResult.data.update_date),
    };
}


export default async function getMarkdownContentForRss(): Promise<MarkdownType[]> {
    let matterList: PostMatterType[] = getMatterList();
    matterList = matterList.filter(item => item.hidden !== true);
    const postIds = matterList.map(item => item.id);
    const posts = await Promise.all(postIds.map(getMarkdownContent));

    return posts;
}