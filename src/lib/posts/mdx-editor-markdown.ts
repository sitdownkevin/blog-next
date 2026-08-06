/**
 * Prepare legacy blog Markdown for @mdxeditor/editor.
 * MDX treats `{...}` as JS expressions (breaks LaTeX) and HTML <img style="...">
 * often fails acorn — normalize before the editor parses.
 */

const FENCE_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;

function mapOutsideCodeFences(
  markdown: string,
  transform: (text: string) => string,
): string {
  const parts = markdown.split(FENCE_RE);
  return parts
    .map((part) => {
      if (part.startsWith("```") || part.startsWith("~~~")) return part;
      return transform(part);
    })
    .join("");
}

/** Convert raw HTML <img> tags to Markdown images. */
export function htmlImgToMarkdown(markdown: string): string {
  return markdown.replace(/<img\b([^>]*)\/?\s*>/gi, (_full, attrs: string) => {
    const src = /\bsrc\s*=\s*(["'])(.*?)\1/i.exec(attrs)?.[2] ?? "";
    const alt = /\balt\s*=\s*(["'])(.*?)\1/i.exec(attrs)?.[2] ?? "";
    if (!src) return _full;
    return `![${alt}](${src})`;
  });
}

/**
 * Escape `{` / `}` outside fenced code so MDX/acorn won't parse LaTeX as JSX expressions.
 * Uses HTML character references; the editor usually re-serializes them back to braces.
 */
export function escapeMdxBraces(markdown: string): string {
  return mapOutsideCodeFences(markdown, (text) =>
    text.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;"),
  );
}

export function unescapeMdxBraces(markdown: string): string {
  return mapOutsideCodeFences(markdown, (text) =>
    text.replace(/&#123;/g, "{").replace(/&#125;/g, "}"),
  );
}

export function toEditorMarkdown(markdown: string): string {
  return escapeMdxBraces(htmlImgToMarkdown(markdown));
}

export function fromEditorMarkdown(markdown: string): string {
  return unescapeMdxBraces(markdown);
}
