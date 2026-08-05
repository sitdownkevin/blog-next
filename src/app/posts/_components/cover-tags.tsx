export function CoverTags({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-2 select-none">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-foreground/70 transition-opacity duration-300 hover:opacity-80"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
