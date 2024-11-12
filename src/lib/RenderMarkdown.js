import fs from 'fs';
import path from 'path';

// Read Markdown Head
import matter from 'gray-matter';

// Render Markdown and Katex
import { unified } from 'unified';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex'; // Math
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm'; // Table
import rehypeHighlight from 'rehype-highlight'; // Code Block
import rehypePrism from 'rehype-prism';


const postDirectory = path.join(process.cwd(), 'posts')

// console.log(postDirectory);

function getMarkdownPostsData() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return { id, ...matterResult.data };
    })

    return allPostsData;
}


export function getMarkdownPostsDataJson() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        const title = matterResult.data.title;
        const tags = matterResult.data.tags;
        const tagList = tags.split(' ');

        return { id, fileName, title, tagList };
    })

    return allPostsData;
}


async function getMarkdownContent(id) {
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
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(matterResult.content)

    const contentHtml = processedContent.toString();

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

export { getMarkdownPostsData, getMarkdownContent };