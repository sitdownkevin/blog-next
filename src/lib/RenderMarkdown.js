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
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(matterResult.content)

    const contentHtml = processedContent.toString();

    // // 添加复制按钮
    // const contentWithCopyButtons = contentHtml.replace(
    //     /<pre><code class="(.*?)">/g,
    //     (match, language) => {
    //         return `<pre><button class="copy-button" onclick="copyCode(this)">Copy</button><code class="${language}">`;
    //     }
    // );

    // // 添加复制功能
    // const copyCodeScript = `
    //     <script>
    //         function copyCode(button) {
    //             const codeElement = button.nextElementSibling;
    //             const textArea = document.createElement("textarea");
    //             textArea.value = codeElement.innerText;
    //             document.body.appendChild(textArea);
    //             textArea.select();
    //             document.execCommand("copy");
    //             document.body.removeChild(textArea);
    //             button.innerText = "Copied!";
    //             setTimeout(() => { button.innerText = "Copy"; }, 2000);
    //         }
    //     </script>
    // `;

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