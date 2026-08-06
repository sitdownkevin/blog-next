import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  DEFAULT_LIST_LIMIT,
  MAX_LIST_LIMIT,
} from "@/lib/gallery/constants";
import { basename, isImageKey, normalizePrefix } from "@/lib/gallery/path";
import type { GalleryEntry } from "@/lib/gallery/types";
import { getBucket, getR2Client, publicUrl } from "@/lib/r2/client";

const DELETE_LIMIT = 1000;
const PRESIGN_EXPIRES_IN = 600; // 10 minutes

export { getR2Client, publicUrl };

export type ListOptions = {
  cursor?: string | null;
  limit?: number;
};

function clampLimit(limit?: number): number {
  if (!limit || !Number.isFinite(limit)) return DEFAULT_LIST_LIMIT;
  return Math.min(MAX_LIST_LIMIT, Math.max(1, Math.floor(limit)));
}

/** One-level listing with delimiter (admin folder browser). */
export async function listPrefix(
  prefixRaw: string,
  options: ListOptions = {},
): Promise<{
  prefix: string;
  entries: GalleryEntry[];
  nextCursor: string | null;
}> {
  const prefix = normalizePrefix(prefixRaw);
  const s3 = getR2Client();
  const limit = clampLimit(options.limit);

  const response = await s3.send(
    new ListObjectsV2Command({
      Bucket: getBucket(),
      Prefix: prefix || undefined,
      Delimiter: "/",
      MaxKeys: limit,
      ContinuationToken: options.cursor || undefined,
    }),
  );

  const dirs = new Map<string, GalleryEntry>();
  const files: GalleryEntry[] = [];

  for (const common of response.CommonPrefixes ?? []) {
    if (!common.Prefix) continue;
    const dirKey = common.Prefix;
    const name = basename(dirKey);
    if (!name) continue;
    dirs.set(dirKey, {
      type: "dir",
      name,
      key: dirKey,
    });
  }

  for (const obj of response.Contents ?? []) {
    if (!obj.Key) continue;
    if (obj.Key === prefix || obj.Key.endsWith("/")) continue;
    if (!isImageKey(obj.Key)) continue;

    files.push({
      type: "file",
      name: basename(obj.Key),
      key: obj.Key,
      url: publicUrl(obj.Key),
      size: obj.Size,
      lastModified: obj.LastModified?.toISOString(),
    });
  }

  const entries = [
    ...Array.from(dirs.values()).sort((a, b) => a.name.localeCompare(b.name)),
    ...files.sort((a, b) => a.name.localeCompare(b.name)),
  ];

  return {
    prefix,
    entries,
    nextCursor: response.IsTruncated
      ? (response.NextContinuationToken ?? null)
      : null,
  };
}

/** Recursive image listing under a prefix (public gallery). */
export async function listImagesRecursive(
  prefixRaw: string,
  options: ListOptions = {},
): Promise<{
  prefix: string;
  entries: GalleryEntry[];
  nextCursor: string | null;
}> {
  const prefix = normalizePrefix(prefixRaw);
  const s3 = getR2Client();
  const limit = clampLimit(options.limit);

  const response = await s3.send(
    new ListObjectsV2Command({
      Bucket: getBucket(),
      Prefix: prefix || undefined,
      MaxKeys: limit,
      ContinuationToken: options.cursor || undefined,
    }),
  );

  const entries: GalleryEntry[] = [];
  for (const obj of response.Contents ?? []) {
    if (!obj.Key) continue;
    if (obj.Key.endsWith("/")) continue;
    if (!isImageKey(obj.Key)) continue;

    entries.push({
      type: "file",
      name: basename(obj.Key),
      key: obj.Key,
      url: publicUrl(obj.Key),
      size: obj.Size,
      lastModified: obj.LastModified?.toISOString(),
    });
  }

  return {
    prefix,
    entries,
    nextCursor: response.IsTruncated
      ? (response.NextContinuationToken ?? null)
      : null,
  };
}

export async function putEmptyDir(dirKey: string): Promise<void> {
  const key = dirKey.endsWith("/") ? dirKey : `${dirKey}/`;
  const s3 = getR2Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: new Uint8Array(0),
      ContentType: "application/x-directory",
    }),
  );
}

export async function presignPut(
  key: string,
  contentType: string,
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const s3 = getR2Client();
  const command = new PutObjectCommand({
    Bucket: getBucket(),
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: PRESIGN_EXPIRES_IN,
  });
  return { uploadUrl, publicUrl: publicUrl(key) };
}

export async function deleteByKey(key: string): Promise<{ deleted: number }> {
  if (key.endsWith("/")) {
    return deletePrefix(key);
  }
  return deletePrefixExactOrObjects(key);
}

async function deletePrefixExactOrObjects(
  key: string,
): Promise<{ deleted: number }> {
  const s3 = getR2Client();
  await s3.send(
    new DeleteObjectsCommand({
      Bucket: getBucket(),
      Delete: {
        Objects: [{ Key: key }],
        Quiet: true,
      },
    }),
  );
  return { deleted: 1 };
}

async function deletePrefix(prefix: string): Promise<{ deleted: number }> {
  const s3 = getR2Client();
  let deleted = 0;
  let continuationToken: string | undefined;

  do {
    const listed = await s3.send(
      new ListObjectsV2Command({
        Bucket: getBucket(),
        Prefix: prefix,
        ContinuationToken: continuationToken,
        MaxKeys: DELETE_LIMIT,
      }),
    );

    const objects = (listed.Contents ?? [])
      .map((obj) => obj.Key)
      .filter((k): k is string => Boolean(k))
      .map((Key) => ({ Key }));

    if (objects.length > 0) {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: getBucket(),
          Delete: { Objects: objects, Quiet: true },
        }),
      );
      deleted += objects.length;
    }

    if (deleted >= DELETE_LIMIT) {
      break;
    }

    continuationToken = listed.IsTruncated
      ? listed.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return { deleted };
}
