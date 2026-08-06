/** Frontmatter date format used across posts: YYYY-MM-DD */
export function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}
