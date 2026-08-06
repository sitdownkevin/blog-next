import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { AuthError, requireAdminSession } from "@/lib/auth/session";
import { encrypt } from "@/lib/posts/crypto";
import { todayDateString } from "@/lib/posts/dates";
import { revalidatePosts } from "@/lib/posts/revalidate";
import {
  listPostSlugs,
  getPostRaw,
  postExists,
  putPost,
  SLUG_PATTERN,
} from "@/lib/posts/r2-store";
import { parsePostMarkdown, serializePostMarkdown } from "@/lib/posts/serialize";

const createSchema = z.object({
  slug: z.string().regex(SLUG_PATTERN),
  title: z.string().min(1),
  tags: z.union([z.array(z.string()), z.string()]),
  description: z.string().optional(),
  pinned: z.boolean().optional(),
  hidden: z.boolean().optional(),
  content: z.string(),
});

export async function GET() {
  try {
    await requireAdminSession();
    const slugs = await listPostSlugs();
    const posts = (
      await Promise.all(
        slugs.map(async (slug) => {
          const raw = await getPostRaw(slug);
          if (raw === null) return null;
          const { frontmatter } = parsePostMarkdown(raw);
          return {
            slug,
            id: encrypt(slug),
            ...frontmatter,
          };
        }),
      )
    ).filter((p): p is NonNullable<typeof p> => p !== null);

    return NextResponse.json({ posts });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin list posts error:", error);
    return NextResponse.json({ error: "Failed to list posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();
    const json = await request.json();
    const parsed = createSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { slug, content, ...rest } = parsed.data;
    if (await postExists(slug)) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const today = todayDateString();
    const markdown = serializePostMarkdown(
      {
        ...rest,
        create_date: today,
        update_date: today,
      },
      content,
    );
    await putPost(slug, markdown);
    revalidatePosts(slug);

    return NextResponse.json(
      { slug, id: encrypt(slug), create_date: today, update_date: today },
      { status: 201 },
    );
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin create post error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
