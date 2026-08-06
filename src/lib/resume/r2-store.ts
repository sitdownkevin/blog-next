import {
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getBucket, getR2Client } from "@/lib/r2/client";
import type { ResumeDocument } from "@/lib/resume/data";

export const RESUME_KEY = "admin/resume.json";

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

export function isResumeDocument(value: unknown): value is ResumeDocument {
  if (!value || typeof value !== "object") return false;
  const doc = value as Record<string, unknown>;
  return (
    typeof doc.en === "object" &&
    doc.en !== null &&
    typeof doc.zh === "object" &&
    doc.zh !== null
  );
}

/** Returns null when the object is missing or invalid. */
export async function readResume(): Promise<ResumeDocument | null> {
  const s3 = getR2Client();
  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: getBucket(),
        Key: RESUME_KEY,
      }),
    );
    const text = await streamToString(response.Body as never);
    const parsed = JSON.parse(text) as unknown;
    return isResumeDocument(parsed) ? parsed : null;
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === "NoSuchKey" || name === "NotFound") {
      return null;
    }
    throw error;
  }
}

export async function writeResume(document: ResumeDocument): Promise<ResumeDocument> {
  if (!isResumeDocument(document)) {
    throw new Error("Invalid resume document");
  }
  const s3 = getR2Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: RESUME_KEY,
      Body: JSON.stringify(document, null, 2),
      ContentType: "application/json",
    }),
  );
  return document;
}
