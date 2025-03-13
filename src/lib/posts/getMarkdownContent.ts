import fs from 'fs';
import path from 'path';
import { decrypt } from '@/lib/posts/crypto';
import matter from 'gray-matter';
import { MarkdownType } from './types';
import { createBasePipeline } from '@/lib/posts/markdownPipeline';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getMarkdownContent(postId: string): Promise<MarkdownType> {
    const fileNameWithoutExt = decrypt(postId);
    const fullPath = path.join(postsDirectory, `${fileNameWithoutExt}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const pipeline = createBasePipeline();
    const contentProcessed = await pipeline.process(matterResult.content);
    const contentHtml: string = contentProcessed.toString();

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
