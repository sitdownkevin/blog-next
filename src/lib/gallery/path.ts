/**
 * Normalize and validate gallery object keys / prefixes.
 * Rejects `..`, absolute paths, and control characters.
 */

import { GALLERY_ROOT } from "@/lib/gallery/constants";

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

/** True if key or prefix is exactly under `root` (inclusive). */
export function isUnderPrefix(path: string, root: string): boolean {
  const normalizedRoot = normalizePrefix(root);
  if (!normalizedRoot) return false;

  let value: string;
  try {
    value = path.endsWith("/") || path === ""
      ? normalizePrefix(path || root)
      : normalizeKey(path);
  } catch {
    return false;
  }

  if (value.endsWith("/")) {
    return value === normalizedRoot || value.startsWith(normalizedRoot);
  }
  return value.startsWith(normalizedRoot);
}

/**
 * Ensure path is under gallery/. Returns normalized key or prefix.
 * Empty input becomes GALLERY_ROOT when `asPrefix` is true.
 */
export function assertUnderGalleryRoot(
  path: string,
  options?: { asPrefix?: boolean },
): string {
  const asPrefix = options?.asPrefix ?? (path.endsWith("/") || path === "");
  let normalized: string;
  if (asPrefix) {
    normalized = normalizePrefix(path || GALLERY_ROOT);
    if (!normalized) normalized = GALLERY_ROOT;
  } else {
    normalized = normalizeKey(path);
  }

  if (!isUnderPrefix(normalized, GALLERY_ROOT)) {
    throw new Error("Path must be under gallery/");
  }
  return normalized;
}

/**
 * Normalize any bucket path for admin management (bucket root allowed).
 * Empty + asPrefix → "" (list bucket root).
 */
export function normalizeAdminPath(
  path: string,
  options?: { asPrefix?: boolean },
): string {
  const asPrefix = options?.asPrefix ?? (path.endsWith("/") || path === "");
  if (asPrefix) {
    return normalizePrefix(path);
  }
  return normalizeKey(path);
}

/** Protect non-image system objects from admin delete. */
export function isProtectedAdminKey(key: string): boolean {
  return key === "admin/wallets.json" || key.startsWith("admin/");
}
