import { Processor, unified } from 'unified';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { remarkFixKatexSyntax } from './remarkFixKatexSyntax';


// 基础 markdown 处理 pipeline
export function createBasePipeline(): Processor<any, any, any, any, string> {
    return unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkFixKatexSyntax)
        .use(remarkGfm)
        .use(remarkToc)
        .use(remarkRehype, {
            allowDangerousHtml: true,
        })
        .use(rehypeKatex)
        .use(rehypePrism)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypeStringify, {
            allowDangerousHtml: true,
        });
}