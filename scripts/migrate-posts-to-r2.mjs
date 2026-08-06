/**
 * Historical one-shot: upload content/posts/*.md to R2 under posts/{slug}.md
 * (idempotent overwrite). Runtime blog content is R2-only; local Markdown was
 * removed. Restore files under content/posts/ before re-running.
 *
 * Usage: node scripts/migrate-posts-to-r2.mjs
 * Requires R2_* env vars (reads .env.local if present).
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function loadEnvLocal() {
  try {
    const text = readFileSync(resolve(".env.local"), "utf8");
    const env = {};
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[trimmed.slice(0, eq).trim()] = value;
    }
    return env;
  } catch {
    return {};
  }
}

const fileEnv = loadEnvLocal();
for (const [key, value] of Object.entries(fileEnv)) {
  if (!process.env[key]) process.env[key] = value;
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const accountId = requireEnv("R2_ACCOUNT_ID");
const bucket = requireEnv("R2_BUCKET");
const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
  },
});

const postsDir = resolve("content/posts");
const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"));

console.log(`Uploading ${files.length} posts to r2://${bucket}/posts/ …`);

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const key = `posts/${slug}.md`;
  const body = readFileSync(join(postsDir, file), "utf8");
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: "text/markdown; charset=utf-8",
    }),
  );
  console.log(`  ✓ ${key}`);
}

console.log("Done.");
