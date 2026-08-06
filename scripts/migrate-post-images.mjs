/**
 * Historical one-shot: download images referenced in content/posts/*.md,
 * upload to R2 under posts/, rewrite markdown links to R2_PUBLIC_URL.
 * Local Markdown was removed after R2 migration; restore content/posts/ first
 * if you need to re-run this script.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function loadEnvLocal() {
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
}

const EXT_MIME = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

const mdImgRe = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
const htmlImgRe = /<img([^>]*?)src=["'](https?:\/\/[^"']+)["']/gi;

function collectUrls(postsDir) {
  const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const urls = new Map();

  for (const file of files) {
    const text = readFileSync(join(postsDir, file), "utf8");
    const withoutCode = text.replace(/```[\s\S]*?```/g, "");

    for (const m of withoutCode.matchAll(mdImgRe)) {
      const url = m[1];
      if (!urls.has(url)) urls.set(url, new Set());
      urls.get(url).add(file);
    }
    for (const m of withoutCode.matchAll(htmlImgRe)) {
      const url = m[2];
      if (!urls.has(url)) urls.set(url, new Set());
      urls.get(url).add(file);
    }
  }

  return urls;
}

function keyForUrl(url, publicBase) {
  if (url.startsWith(publicBase + "/")) {
    return null; // already on our host
  }
  const pathname = decodeURIComponent(new URL(url).pathname);
  const basename = pathname.split("/").filter(Boolean).pop();
  if (!basename || !/\.(png|jpe?g|webp|gif|avif)$/i.test(basename)) {
    throw new Error(`Cannot derive key from ${url}`);
  }
  return `posts/${basename}`;
}

function mimeForKey(key, headerType) {
  if (headerType && headerType.startsWith("image/")) {
    return headerType.split(";")[0].trim();
  }
  const ext = key.split(".").pop().toLowerCase();
  return EXT_MIME[ext] || "application/octet-stream";
}

async function main() {
  const env = loadEnvLocal();
  const publicBase = env.R2_PUBLIC_URL.replace(/\/+$/, "");
  const postsDir = resolve("content/posts");
  const urlMap = collectUrls(postsDir);

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });

  const replacements = new Map(); // oldUrl -> newUrl
  const failures = [];

  console.log(`Found ${urlMap.size} unique image URLs`);

  for (const [url] of urlMap) {
    let key;
    try {
      key = keyForUrl(url, publicBase);
    } catch (e) {
      failures.push({ url, stage: "key", error: e.message });
      continue;
    }
    if (!key) {
      console.log(`skip (already hosted): ${url}`);
      continue;
    }

    const newUrl = `${publicBase}/${key.split("/").map(encodeURIComponent).join("/")}`;

    try {
      console.log(`download ${url}`);
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "blog-next-migrate/1.0 (+https://kexu.win; image migration)",
          Accept: "image/*,*/*",
        },
        redirect: "follow",
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 32) {
        throw new Error(`Suspiciously small body (${buf.length} bytes)`);
      }
      const contentType = mimeForKey(key, res.headers.get("content-type"));

      console.log(`upload ${key} (${buf.length} bytes, ${contentType})`);
      await client.send(
        new PutObjectCommand({
          Bucket: env.R2_BUCKET,
          Key: key,
          Body: buf,
          ContentType: contentType,
        }),
      );

      replacements.set(url, newUrl);
    } catch (e) {
      failures.push({ url, stage: "transfer", error: e.message });
      console.error(`FAIL ${url}: ${e.message}`);
    }
  }

  // Rewrite markdown only for successful uploads
  const filesTouched = new Set();
  for (const file of readdirSync(postsDir).filter((f) => f.endsWith(".md"))) {
    const path = join(postsDir, file);
    let text = readFileSync(path, "utf8");
    let changed = false;

    for (const [oldUrl, newUrl] of replacements) {
      if (!text.includes(oldUrl)) continue;
      text = text.split(oldUrl).join(newUrl);
      changed = true;
    }

    if (changed) {
      writeFileSync(path, text, "utf8");
      filesTouched.add(file);
      console.log(`rewrote ${file}`);
    }
  }

  console.log(
    JSON.stringify(
      {
        uploaded: replacements.size,
        failed: failures.length,
        filesTouched: [...filesTouched].sort(),
        failures,
        sample: [...replacements.entries()].slice(0, 3),
      },
      null,
      2,
    ),
  );

  if (failures.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
