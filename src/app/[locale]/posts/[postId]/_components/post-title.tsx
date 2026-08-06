export function PostTitle({ title }: { title: string }) {
  return (
    <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
      {title}
    </h1>
  );
}
