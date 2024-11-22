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
import { visit } from 'unist-util-visit';

const postDirectory = path.join(process.cwd(), 'posts');

function rehypeMermaid() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            // 处理 Mermaid 图表
            if (node.tagName === 'pre') {
                const code = node.children[0];
                if (code && code.tagName === 'code' && 
                    code.properties.className && 
                    code.properties.className.includes('language-mermaid')) {
                    const value = code.children[0].value;
                    node.tagName = 'div';
                    node.properties = { 
                        className: ['mermaid', 'my-8', 'flex', 'justify-center'] 
                    };
                    node.children = [{ type: 'text', value: value.trim() }];
                }
            }
        });
    };
}

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
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkToc)
        .use(remarkRehype)
        .use(rehypeKatex, {
            strict: false,  // 关闭严格模式
            trust: true,    // 允许所有 KaTeX 命令
            throwOnError: false  // 不抛出错误
        })
        .use(rehypeHighlight)
        .use(rehypePrism)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypeMermaid)
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