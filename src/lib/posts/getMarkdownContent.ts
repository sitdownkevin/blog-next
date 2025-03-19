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
                            bg-zinc-500/50 hover:bg-zinc-400/60 text-zinc-100 hover:text-white
                            rounded-md w-8 h-8 
                            transition-all duration-200 ease-in-out
                            shadow-sm hover:shadow-md
                            ring-1 ring-zinc-400/20 hover:ring-zinc-300/30"
                            onclick="(() => {
                                navigator.clipboard.writeText(this.parentElement.querySelector('code').textContent);
                                const copyIcon = this.querySelector('.copy-icon');
                                const checkIcon = this.querySelector('.check-icon');
                                copyIcon.classList.add('hidden');
                                checkIcon.classList.remove('hidden');
                                this.classList.add('bg-emerald-600/70', 'hover:bg-emerald-500/80', 'ring-emerald-400/30');
                                setTimeout(() => {
                                    copyIcon.classList.remove('hidden');
                                    checkIcon.classList.add('hidden');
                                    this.classList.remove('bg-emerald-600/70', 'hover:bg-emerald-500/80', 'ring-emerald-400/30');
                                }, 3000);
                            })()">
                        <svg class="copy-icon w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                        <svg class="check-icon hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
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
