"use client";

export function PostDate({ date }: { date: Date | string }) {
  const resolvedDate = date instanceof Date ? date : new Date(date);
  const pivotDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  if (resolvedDate.getTime() <= pivotDate.getTime()) {
    return null;
  }

  return (
    <p className="select-none text-muted-foreground text-xs font-medium font-mono tabular-nums">
      {resolvedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  );
}
