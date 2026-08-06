import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { basename, isImageKey, normalizePrefix } from "@/lib/gallery/path";
import type { GalleryEntry } from "@/lib/gallery/types";

const DELETE_LIMIT = 1000;
const PRESIGN_EXPIRES_IN = 600; // 10 minutes

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getBucket(): string {
  return requireEnv("R2_BUCKET");
}

function getPublicBaseUrl(): string {
  return requireEnv("R2_PUBLIC_URL").replace(/\/+$/, "");
}

let client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (client) return client;

  const accountId = requireEnv("R2_ACCOUNT_ID");
  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
  return client;
}

export function publicUrl(key: string): string {
  const encoded = key
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${getPublicBaseUrl()}/${encoded}`;
}

export async function listPrefix(prefixRaw: string): Promise<{
  prefix: string;
  entries: GalleryEntry[];
}> {
  const prefix = normalizePrefix(prefixRaw);
  const s3 = getR2Client();
  const dirs = new Map<string, GalleryEntry>();
  const files: GalleryEntry[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: getBucket(),
        Prefix: prefix || undefined,
        Delimiter: "/",
        ContinuationToken: continuationToken,
      }),
    );

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
      // Skip the directory placeholder object itself (e.g. "foo/")
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

    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined;
  } while (continuationToken);

  const entries = [
    ...Array.from(dirs.values()).sort((a, b) => a.name.localeCompare(b.name)),
    ...files.sort((a, b) => a.name.localeCompare(b.name)),
  ];

  return { prefix, entries };
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
  // Single file delete
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
