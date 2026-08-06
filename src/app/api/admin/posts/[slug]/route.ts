import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { AuthError, requireAdminSession } from "@/lib/auth/session";
import { encrypt } from "@/lib/posts/crypto";
import { todayDateString } from "@/lib/posts/dates";
import { revalidatePosts } from "@/lib/posts/revalidate";
import {
  deletePost,
  getPostRaw,
  postExists,
  putPost,
  SLUG_PATTERN,
} from "@/lib/posts/r2-store";
import { parsePostMarkdown, serializePostMarkdown } from "@/lib/posts/serialize";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

const updateSchema = z.object({
  slug: z.string().regex(SLUG_PATTERN).optional(),
  title: z.string().min(1),
  tags: z.union([z.array(z.string()), z.string()]),
  description: z.string().optional(),
  pinned: z.boolean().optional(),
  hidden: z.boolean().optional(),
  content: z.string(),
});

function invalidSlug(slug: string) {
  return !SLUG_PATTERN.test(slug);
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    await requireAdminSession();
    const { slug } = await context.params;
    if (invalidSlug(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const raw = await getPostRaw(slug);
    if (raw === null) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const parsed = parsePostMarkdown(raw);
    return NextResponse.json({
      slug,
      id: encrypt(slug),
      ...parsed.frontmatter,
      content: parsed.content,
      raw,
    });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin get post error:", error);
    return NextResponse.json({ error: "Failed to get post" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminSession();
    const { slug: oldSlug } = await context.params;
    if (invalidSlug(oldSlug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const existing = await getPostRaw(oldSlug);
    if (existing === null) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const json = await request.json();
    const parsed = updateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { content, slug: requestedSlug, ...rest } = parsed.data;
    const newSlug = requestedSlug ?? oldSlug;
    const slugChanged = newSlug !== oldSlug;

    if (slugChanged && (await postExists(newSlug))) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const existingMeta = parsePostMarkdown(existing);
    const today = todayDateString();
    const create_date = existingMeta.frontmatter.create_date || today;

    const markdown = serializePostMarkdown(
      {
        ...rest,
        create_date,
        update_date: today,
      },
      content,
    );

    await putPost(newSlug, markdown);
    if (slugChanged) {
      await deletePost(oldSlug);
      revalidatePosts(oldSlug);
    }
    revalidatePosts(newSlug);

    return NextResponse.json({
      slug: newSlug,
      id: encrypt(newSlug),
      create_date,
      update_date: today,
    });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin update post error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    await requireAdminSession();
    const { slug } = await context.params;
    if (invalidSlug(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const existing = await getPostRaw(slug);
    if (existing === null) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deletePost(slug);
    revalidatePosts(slug);

    return NextResponse.json({ ok: true });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin delete post error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
