import fs from "fs";
import path from "path";
import { cacheLife } from "next/cache";
import { decrypt } from "@/lib/posts/crypto";
import matter from "gray-matter";
import { MarkdownType } from "./types";
import { createBasePipeline } from "@/lib/posts/markdownPipeline";
import { parsePostDate } from "./parse-post-date";

const postsDirectory = path.join(process.cwd(), "content/posts");

function addCopyButton(contentHtml: string): string {
  // Preserve Prism-highlighted markup inside <code>; only wrap for copy UX.
  return contentHtml.replace(
    /<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (_match, preAttrs: string, codeAttrs: string, codeHtml: string) => {
      const languageMatch = `${preAttrs} ${codeAttrs}`.match(
        /language-([a-zA-Z0-9_+-]+)/,
      );
      const language = languageMatch?.[1] ?? "text";

      return `
<div class="relative group code-block" data-language="${language}">
  <button type="button" class="code-copy-btn absolute hidden group-hover:flex items-center justify-center right-2 top-2 z-10 bg-zinc-600/70 hover:bg-zinc-500/80 text-zinc-100 hover:text-white rounded-md w-8 h-8 transition-all duration-200 ease-in-out shadow-xs ring-1 ring-zinc-400/20" onclick="(() => {
    const code = this.parentElement.querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.textContent || '');
    const copyIcon = this.querySelector('.copy-icon');
    const checkIcon = this.querySelector('.check-icon');
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');
    this.classList.add('is-copied');
    setTimeout(() => {
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
      this.classList.remove('is-copied');
    }, 3000);
  })()" aria-label="Copy code">
    <svg class="copy-icon w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
    <svg class="check-icon hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  </button>
  <pre${preAttrs}><code${codeAttrs}>${codeHtml}</code></pre>
</div>`.trim();
    },
  );
}

export async function getMarkdownContent(
  postId: string,
): Promise<MarkdownType> {
  "use cache";
  cacheLife("days");

  const fileNameWithoutExt = decrypt(postId);
  const fullPath = path.join(postsDirectory, `${fileNameWithoutExt}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const pipeline = createBasePipeline();
  const contentProcessed = await pipeline.process(matterResult.content);
  let contentHtml: string = contentProcessed.toString();

  contentHtml = addCopyButton(contentHtml);

  return {
    content: contentHtml,
    id: postId,
    title: matterResult.data.title,
    tags: matterResult.data.tags.split(","),
    description: matterResult.data.description,
    create_date: parsePostDate(matterResult.data.create_date),
    update_date: parsePostDate(matterResult.data.update_date),
  };
}
