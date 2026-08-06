import matter from "gray-matter";

export type PostFrontmatterInput = {
  title: string;
  tags: string[] | string;
  description?: string;
  pinned?: boolean;
  hidden?: boolean;
  create_date?: string | null;
  update_date?: string | null;
};

function tagsToString(tags: string[] | string): string {
  if (Array.isArray(tags)) {
    return tags.map((t) => t.trim()).filter(Boolean).join(",");
  }
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .join(",");
}

export function serializePostMarkdown(
  frontmatter: PostFrontmatterInput,
  content: string,
): string {
  const data: Record<string, unknown> = {
    title: frontmatter.title,
    tags: tagsToString(frontmatter.tags),
    create_date: frontmatter.create_date ?? null,
    update_date: frontmatter.update_date ?? null,
  };

  if (frontmatter.description !== undefined && frontmatter.description !== "") {
    data.description = frontmatter.description;
  }
  if (frontmatter.pinned) {
    data.pinned = true;
  }
  if (frontmatter.hidden) {
    data.hidden = true;
  }

  return matter.stringify(content.replace(/^\n+/, ""), data);
}

export function parsePostMarkdown(raw: string): {
  frontmatter: {
    title: string;
    tags: string[];
    description?: string;
    pinned: boolean;
    hidden: boolean;
    create_date: string | null;
    update_date: string | null;
  };
  content: string;
} {
  const parsed = matter(raw);
  const tagsRaw = parsed.data.tags;
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.map(String)
    : typeof tagsRaw === "string"
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  const dateToString = (value: unknown): string | null => {
    if (value === null || value === undefined || value === "") return null;
    if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    }
    return String(value);
  };

  return {
    frontmatter: {
      title: String(parsed.data.title ?? ""),
      tags,
      description:
        parsed.data.description !== undefined
          ? String(parsed.data.description)
          : undefined,
      pinned: Boolean(parsed.data.pinned),
      hidden: Boolean(parsed.data.hidden),
      create_date: dateToString(parsed.data.create_date),
      update_date: dateToString(parsed.data.update_date),
    },
    content: parsed.content.replace(/^\n+/, ""),
  };
}
