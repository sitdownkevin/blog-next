import crypto from "crypto";
import { listPostSlugs } from "@/lib/posts/r2-store";

export function encrypt(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function decrypt(textDecrypted: string): Promise<string> {
  const slugs = await listPostSlugs();
  const decryptedText = slugs.find((slug) => encrypt(slug) === textDecrypted);

  if (decryptedText) {
    return decryptedText;
  }
  return "404";
}
