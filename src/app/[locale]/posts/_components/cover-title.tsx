import Link from "next/link";

export function CoverTitle({
  title,
  postId,
}: {
  title: string;
  postId: string;
}) {
  return (
    <Link
      href={`/posts/${postId}`}
      className="font-display text-base sm:text-lg font-semibold tracking-tight text-balance group-hover:text-claude-orange transition-colors"
      title={title}
    >
      {title}
    </Link>
  );
}
