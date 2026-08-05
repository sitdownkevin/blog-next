import Link from "next/link";

export function CoverTitle({
  title,
  postId,
}: {
  title: string;
  postId: string;
}) {
  return (
    <div className="font-display text-lg md:text-2xl font-semibold tracking-tight truncate hover:opacity-80 select-none">
      <Link href={`/posts/${postId}`} className="hover:underline" title={title}>
        {title}
      </Link>
    </div>
  );
}
