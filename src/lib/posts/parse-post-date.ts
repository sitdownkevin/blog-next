/**
 * Parse frontmatter dates. YAML `null` becomes `new Date(null)` → Unix epoch;
 * treat that (and other invalid values) as missing.
 */
export function parsePostDate(value: unknown): Date | undefined {
  if (value == null || value === "") return undefined;

  const date = value instanceof Date ? value : new Date(value as string | number);
  if (Number.isNaN(date.getTime()) || date.getTime() === 0) {
    return undefined;
  }

  return date;
}

export function isDisplayablePostDate(
  date: Date | string | null | undefined,
): date is Date {
  if (date == null || date === "") return false;
  const resolved = date instanceof Date ? date : new Date(date);
  return !Number.isNaN(resolved.getTime()) && resolved.getTime() !== 0;
}
