import {
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getBucket, getR2Client } from "@/lib/r2/client";
import type { PersonalIntroDocument } from "@/lib/personal-intro/types";

export const PERSONAL_INTRO_KEY = "admin/personal-intro.json";

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

function hasLocalePair(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.en === "object" &&
    obj.en !== null &&
    typeof obj.zh === "object" &&
    obj.zh !== null
  );
}

export function isPersonalIntroDocument(
  value: unknown,
): value is PersonalIntroDocument {
  if (!value || typeof value !== "object") return false;
  const doc = value as Record<string, unknown>;
  return (
    hasLocalePair(doc.abstract) &&
    hasLocalePair(doc.education) &&
    hasLocalePair(doc.workingExp) &&
    hasLocalePair(doc.projects) &&
    hasLocalePair(doc.publications)
  );
}

/** Returns null when the object is missing or invalid. */
export async function readPersonalIntro(): Promise<PersonalIntroDocument | null> {
  const s3 = getR2Client();
  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: getBucket(),
        Key: PERSONAL_INTRO_KEY,
      }),
    );
    const text = await streamToString(response.Body as never);
    const parsed = JSON.parse(text) as unknown;
    return isPersonalIntroDocument(parsed) ? parsed : null;
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === "NoSuchKey" || name === "NotFound") {
      return null;
    }
    throw error;
  }
}

export async function writePersonalIntro(
  document: PersonalIntroDocument,
): Promise<PersonalIntroDocument> {
  if (!isPersonalIntroDocument(document)) {
    throw new Error("Invalid personal intro document");
  }
  const s3 = getR2Client();
  await s3.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: PERSONAL_INTRO_KEY,
      Body: JSON.stringify(document, null, 2),
      ContentType: "application/json",
    }),
  );
  return document;
}
