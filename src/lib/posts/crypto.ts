import crypto from "crypto";
import path from "path";
import fs from "fs";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function encrypt(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export function decrypt(textDecrypted: string): string {
  const fileNamesWithoutExt = fs
    .readdirSync(postsDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""));
  const decryptedText = fileNamesWithoutExt.find(
    (fileName) => encrypt(fileName) === textDecrypted,
  );

  if (decryptedText) {
    return decryptedText;
  } else {
    return "404";
  }
}
