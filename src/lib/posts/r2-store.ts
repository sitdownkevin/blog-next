import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getBucket, getR2Client } from "@/lib/r2/client";
import { SLUG_PATTERN } from "@/lib/posts/slug";

const POSTS_PREFIX = "posts/";

export { SLUG_PATTERN };

export function postKey(slug: string): string {
  return `${POSTS_PREFIX}${slug}.md`;
}

export function slugFromKey(key: string): string | null {
  if (!key.startsWith(POSTS_PREFIX) || !key.endsWith(".md")) return null;
  const slug = key.slice(POSTS_PREFIX.length, -".md".length);
  if (!slug || slug.includes("/")) return null;
  return slug;
}

async function streamToString(
  body: ReadableStream | Blob | NodeJS.ReadableStream | undefined,
): Promise<string> {
  if (!body) return "";
  if (typeof (body as Blob).text === "function") {
    return (body as Blob).text();
  }
  const chunks: Buffer[] = [];
  for await (const chunk of body as AsyncIterable<Uint8Array | string>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function listPostSlugs(): Promise<string[]> {
  const s3 = getR2Client();
  const slugs: string[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: getBucket(),
        Prefix: POSTS_PREFIX,
        ContinuationToken: continuationToken,
      }),
    );

    for (const obj of response.Contents ?? []) {
      if (!obj.Key) continue;
      const slug = slugFromKey(obj.Key);
      if (slug) slugs.push(slug);
    }

    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return slugs.sort((a, b) => a.localeCompare(b));
}

export async function getPostRaw(slug: string): Promise<string | null> {
  const s3 = getR2Client();
  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: getBucket(),
        Key: postKey(slug),
      }),
    );
    return streamToString(response.Body as never);
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === "NoSuchKey" || name === "NotFound") {
      return null;
    }
    throw error;
  }
}

export async function putPost(slug: string, markdown: string): Promise<void> {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  const s3 = getR2Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: postKey(slug),
      Body: markdown,
      ContentType: "text/markdown; charset=utf-8",
    }),
  );
}

export async function deletePost(slug: string): Promise<void> {
  const s3 = getR2Client();
  await s3.send(
    new DeleteObjectCommand({
      Bucket: getBucket(),
      Key: postKey(slug),
    }),
  );
}

export async function postExists(slug: string): Promise<boolean> {
  const raw = await getPostRaw(slug);
  return raw !== null;
}
