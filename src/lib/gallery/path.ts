/**
 * Normalize and validate gallery object keys / prefixes.
 * Rejects `..`, absolute paths, and control characters.
 */

export function normalizePrefix(raw: string | null | undefined): string {
  if (!raw) return "";
  const cleaned = sanitizeSegments(raw);
  if (!cleaned) return "";
  return cleaned.endsWith("/") ? cleaned : `${cleaned}/`;
}

export function normalizeKey(raw: string): string {
  const cleaned = sanitizeSegments(raw);
  if (!cleaned) {
    throw new Error("Invalid key");
  }
  // Object keys must not end with `/` (dirs use trailing slash via mkdir)
  return cleaned.replace(/\/+$/, "");
}

export function normalizeDirKey(raw: string): string {
  const prefix = normalizePrefix(raw);
  if (!prefix) {
    throw new Error("Invalid directory path");
  }
  return prefix;
}

export function basename(key: string): string {
  const trimmed = key.replace(/\/+$/, "");
  const parts = trimmed.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? trimmed;
}

export function joinKey(prefix: string, name: string): string {
  const p = normalizePrefix(prefix);
  const n = name.replace(/^\/+|\/+$/g, "");
  if (!n || n.includes("..") || n.includes("/")) {
    throw new Error("Invalid name");
  }
  return `${p}${n}`;
}

function sanitizeSegments(raw: string): string {
  let value = raw.trim().replace(/\\/g, "/");

  if (value.startsWith("/")) {
    throw new Error("Absolute paths are not allowed");
  }

  if (/[\0\r\n]/.test(value)) {
    throw new Error("Invalid characters in path");
  }

  const segments = value.split("/").filter((seg) => seg.length > 0);

  for (const seg of segments) {
    if (seg === "." || seg === ".." || seg.includes("..")) {
      throw new Error("Path traversal is not allowed");
    }
  }

  return segments.join("/");
}

export function isImageKey(key: string): boolean {
  const lower = key.toLowerCase();
  return /\.(jpe?g|png|webp|gif|avif)$/.test(lower);
}

export function mimeMatchesKey(key: string, contentType: string): boolean {
  const match = key.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!match) return false;
  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  const expected =
    ext === "jpg"
      ? "image/jpeg"
      : (`image/${ext}` as string);
  return expected === contentType;
}
