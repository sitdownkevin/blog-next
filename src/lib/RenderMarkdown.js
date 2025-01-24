import fs from 'fs';
import path from 'path';

// Read Markdown Head
import matter from 'gray-matter';

import { createBasePipeline, createRssPipeline } from './markdown-pipeline';
const postDirectory = path.join(process.cwd(), 'posts');

import { KATEX_CSS } from './katex-css';
import { rehypeMermaid } from './rehype-mermaid';

export function getMarkdownPostsDataJson() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        if (matterResult.data.hidden === true) {
            return null;
        }

        const pinned = matterResult.data.pinned === true;

        const title = matterResult.data.title;
        const tags = matterResult.data.tags;
        const tagList = tags.split(' ');

        // Convert date strings to Date objects
        const create_date = new Date(matterResult.data.create_date || '2020-01-01');
        const update_date = new Date(matterResult.data.update_date || '2020-01-01');

        return { id, fileName, title, tagList, create_date, update_date, pinned };
    }).filter(post => post !== null);

    allPostsData.sort((a, b) => {
        // Check if either post is pinned
        if (a.pinned && !b.pinned) {
            return -1; // a is pinned, so it comes first
        } else if (!a.pinned && b.pinned) {
            return 1; // b is pinned, so it comes first
        } else {
            // Both posts are either pinned or not pinned, sort by update_date
            return b.update_date - a.update_date;
        }
    });

    return allPostsData;
}


export async function getMarkdownContent(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // 使用缓存机制
    const cacheKey = `markdown:${id}`;
    let contentHtml;
    
    try {
        const pipeline = createBasePipeline();
        const processedContent = await pipeline.process(matterResult.content);
        contentHtml = processedContent.toString();
    } catch (error) {
        console.error(`Error processing markdown for ${id}:`, error);
        throw new Error('Failed to process markdown content');
    }

    const title = matterResult.data.title;
    const tags = matterResult.data.tags;
    const tagList = tags.split(' ');

    return {
        id,
        title,
        tags,
        tagList,
        contentHtml,
    }
}

export async function getMarkdownContentForRSS(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    let contentHtml;
    try {
        const pipeline = createRssPipeline();
        const processedContent = await pipeline.process(matterResult.content);
        contentHtml = processedContent.toString();
        
        // 添加 KaTeX CSS
        contentHtml = `<style>${KATEX_CSS}</style>${contentHtml}`;
    } catch (error) {
        console.error(`Error processing RSS markdown for ${id}:`, error);
        throw new Error('Failed to process RSS markdown content');
    }

    return {
        contentHtml,
        ...matterResult.data
    };
}
