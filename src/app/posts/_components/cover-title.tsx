import { Anton, Noto_Sans_SC } from "next/font/google";

const nameDisplayFont = Anton({
  weight: ["400"],
});

const chineseFallbackFont = Noto_Sans_SC({
  weight: ["400"],
});

import Link from "next/link";

export function CoverTitle({
  title,
  postId,
}: {
  title: string;
  postId: string;
}) {
  return (
    <div
      className={`text-lg md:text-2xl truncate hover:opacity-80 select-none ${nameDisplayFont.className}`}
      style={{
        fontFamily: `${nameDisplayFont.style.fontFamily}, ${chineseFallbackFont.style.fontFamily}, sans-serif`,
      }}
    >
      <Link href={`/posts/${postId}`} className="hover:underline" title={title}>
        {title}
      </Link>
    </div>
  );
}
