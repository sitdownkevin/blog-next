import fs from 'fs';
import path from 'path';

// Read Markdown Head
import matter from 'gray-matter';

// Render Markdown and Katex
import { unified } from 'unified';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism';


const postDirectory = path.join(process.cwd(), 'quickrefs')


export function getAllQuickrefData() {
    const fileNames = fs.readdirSync(postDirectory);
    
    return fileNames.map((fileName, index) => {
        const fullPath = path.join(postDirectory, fileName);

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id: fileName.replace(/\.md$/, ''),
            key: index,
            name: matterResult.data.title,
        }
    })
}


export async function getQuickrefContent({ id }) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(matterResult.content)

    const title = matterResult.data.title;
    const contentHtml = processedContent.toString();

    return {
        id,
        title,
        contentHtml,
    }
}