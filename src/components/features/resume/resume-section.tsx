export function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-xl font-semibold tracking-tight text-balance border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ResumeEntry({
  primary,
  secondary,
  place,
  period,
  children,
}: {
  primary: string;
  secondary?: string;
  place?: string;
  period?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="flex flex-col gap-2 py-3.5 border-b border-border last:border-b-0 last:pb-0 first:pt-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold text-sm text-foreground">
              {primary}
            </span>
            {place ? (
              <span className="text-xs text-muted-foreground">{place}</span>
            ) : null}
          </div>
          {secondary ? (
            <span className="text-sm text-foreground/75 leading-snug">
              {secondary}
            </span>
          ) : null}
        </div>
        {period ? (
          <time className="text-xs text-muted-foreground font-mono tabular-nums whitespace-nowrap shrink-0">
            {period}
          </time>
        ) : null}
      </div>
      {children}
    </article>
  );
}

export function ResumeBulletList({ items }: { items: string[] }) {
  if (!items?.length) return null;

  return (
    <ul className="flex flex-col gap-1.5 pl-0 list-none">
      {items.map((item, index) => (
        <li
          key={index}
          className="relative pl-3.5 text-sm text-muted-foreground leading-relaxed before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-claude-orange/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
