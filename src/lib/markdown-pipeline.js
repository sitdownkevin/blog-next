import { unified } from 'unified';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypePrism from 'rehype-prism';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { rehypeMermaid } from './rehype-mermaid';

// 基础 markdown 处理 pipeline
export function createBasePipeline() {
    return unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkToc)
        .use(remarkRehype)
        .use(rehypeKatex, {
            strict: false,
            trust: true,
            throwOnError: false
        })
        .use(rehypeHighlight)
        .use(rehypePrism)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypeMermaid)
        .use(rehypeStringify);
}

// RSS 专用的 markdown 处理 pipeline
export function createRssPipeline() {
    return unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeKatex, {
            output: 'html',
            throwOnError: false,
            strict: false,
            trust: true,
            macros: {
                "\\RR": "\\mathbb{R}",
                "\\NN": "\\mathbb{N}",
                "\\ZZ": "\\mathbb{Z}"
            }
        })
        .use(rehypeStringify);
}
