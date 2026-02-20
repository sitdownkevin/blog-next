import { Anton, Noto_Serif_SC } from "next/font/google";
import Link from "next/link";

const nameDisplayFont = Anton({
  weight: ["400"],
  variable: "--font-anton",
});

const chineseFallbackFont = Noto_Serif_SC({
  weight: ["800"],
  variable: "--font-noto-serif-sc",
});

export function CoverTitle({
  title,
  postId,
}: {
  title: string;
  postId: string;
}) {
  return (
    <div
      className={`text-lg md:text-2xl truncate hover:opacity-80 select-none ${nameDisplayFont.variable} ${chineseFallbackFont.variable}`}
      style={{
        fontFamily: "var(--font-anton), var(--font-noto-serif-sc), sans-serif",
      }}
    >
      <Link href={`/posts/${postId}`} className="hover:underline" title={title}>
        {title}
      </Link>
    </div>
  );
}
