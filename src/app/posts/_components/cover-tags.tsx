export function CoverTags({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5 select-none">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
