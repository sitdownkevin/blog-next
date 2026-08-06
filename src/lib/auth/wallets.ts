import {
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getAddress, isAddress } from "viem";
import { getBucket, getR2Client } from "@/lib/r2/client";

export const WALLETS_KEY = "admin/wallets.json";

const DEFAULT_ADMIN =
  "0x7d7984e2ea378465a0e759df675f9d295e566017";

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

function bootstrapAddress(): string {
  const raw =
    process.env.ADMIN_BOOTSTRAP_ADDRESS ||
    process.env.GALLERY_ADMIN_ADDRESS ||
    DEFAULT_ADMIN;
  if (!isAddress(raw)) {
    throw new Error("Invalid ADMIN_BOOTSTRAP_ADDRESS / GALLERY_ADMIN_ADDRESS");
  }
  return getAddress(raw);
}

function normalizeAddresses(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const out: string[] = [];
  for (const item of input) {
    if (typeof item !== "string" || !isAddress(item)) continue;
    const normalized = getAddress(item);
    if (!out.includes(normalized)) out.push(normalized);
  }
  return out;
}

export async function readWallets(): Promise<string[]> {
  const s3 = getR2Client();
  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: getBucket(),
        Key: WALLETS_KEY,
      }),
    );
    const text = await streamToString(response.Body as never);
    const parsed = JSON.parse(text) as unknown;
    const wallets = normalizeAddresses(parsed);
    if (wallets.length === 0) {
      const seed = [bootstrapAddress()];
      await writeWallets(seed);
      return seed;
    }
    return wallets;
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === "NoSuchKey" || name === "NotFound") {
      const seed = [bootstrapAddress()];
      await writeWallets(seed);
      return seed;
    }
    throw error;
  }
}

export async function writeWallets(addresses: string[]): Promise<string[]> {
  const wallets = normalizeAddresses(addresses);
  if (wallets.length === 0) {
    throw new Error("At least one admin wallet is required");
  }
  const s3 = getR2Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: WALLETS_KEY,
      Body: JSON.stringify(wallets, null, 2),
      ContentType: "application/json",
    }),
  );
  return wallets;
}

export async function isAdminAddress(address: string): Promise<boolean> {
  if (!isAddress(address)) return false;
  const wallets = await readWallets();
  return wallets.includes(getAddress(address));
}
