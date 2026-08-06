import { S3Client } from "@aws-sdk/client-s3";

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getBucket(): string {
  return requireEnv("R2_BUCKET");
}

export function getPublicBaseUrl(): string {
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
    // Avoid x-amz-checksum-* on presigned PUTs — they break browser CORS with R2.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
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
