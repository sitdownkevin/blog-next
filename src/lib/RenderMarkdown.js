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
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';


const postDirectory = path.join(process.cwd(), 'posts');


// function getMarkdownPostsData() {
//     const fileNames = fs.readdirSync(postDirectory);
//     const allPostsData = fileNames.map(fileName => {
//         const id = fileName.replace(/\.md$/, '');

//         const fullPath = path.join(postDirectory, fileName);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');

//         const matterResult = matter(fileContents);
//         console.log(matterResult.data);
//         if (matterResult.data.hidden === true) {
//             return null;
//         }

//         return { id, ...matterResult.data };
//     }).filter(post => post !== null);

//     return allPostsData;
// }


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

    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkToc, { heading: 'Contents' })
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypePrism)
        // .use(rehypeHighlight)
        .use(rehypeSlug)
        // .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
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