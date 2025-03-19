import fs from 'fs';
import path from 'path';
import { decrypt } from '@/lib/posts/crypto';
import matter from 'gray-matter';
import { MarkdownType } from './types';
import { createBasePipeline } from '@/lib/posts/markdownPipeline';

const postsDirectory = path.join(process.cwd(), 'posts');


function addCopyButton(contentHtml: string): string {
    return contentHtml.replace(
        /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g,
        (match, language, code) => {
            return `
                <div class="relative group">
                    <button class="absolute hidden group-hover:flex items-center justify-center right-2 top-2 
                            bg-zinc-700/70 hover:bg-zinc-600/80 text-zinc-200 hover:text-white
                            rounded-md px-3 py-1.5 text-xs font-medium
                            transition-all duration-200 ease-in-out
                            shadow-sm hover:shadow-md
                            ring-1 ring-zinc-500/20 hover:ring-zinc-400/30"
                            onclick="(() => {
                                navigator.clipboard.writeText(this.parentElement.querySelector('code').textContent);
                                this.textContent = 'Copied!';
                                this.classList.add('bg-emerald-600/70', 'hover:bg-emerald-500/80', 'ring-emerald-400/30');
                                setTimeout(() => {
                                    this.textContent = 'Copy';
                                    this.classList.remove('bg-emerald-600/70', 'hover:bg-emerald-500/80', 'ring-emerald-400/30');
                                }, 3000);
                            })()">
                        Copy
                    </button>
                    <pre><code class="language-${language}">${code}</code></pre>
                </div>
            `.trim();
        }
    );
}


export async function getMarkdownContent(postId: string): Promise<MarkdownType> {
    const fileNameWithoutExt = decrypt(postId);
    const fullPath = path.join(postsDirectory, `${fileNameWithoutExt}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const pipeline = createBasePipeline();
    const contentProcessed = await pipeline.process(matterResult.content);
    let contentHtml: string = contentProcessed.toString();

    // Add copy button to code blocks
    contentHtml = addCopyButton(contentHtml);

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
