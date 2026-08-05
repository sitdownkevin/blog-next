export function CoverDate({ date }: { date: Date }) {
  if (Number.isNaN(date.getTime())) return null;

  return (
    <span className="select-none text-muted-foreground text-xs font-mono tabular-nums shrink-0">
      {date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </span>
  );
}
