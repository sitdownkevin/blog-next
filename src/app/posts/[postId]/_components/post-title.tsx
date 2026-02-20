import { Anton, Noto_Serif_SC } from "next/font/google";

const nameDisplayFont = Anton({
  weight: ["400"],
  variable: "--font-anton",
});

const chineseFallbackFont = Noto_Serif_SC({
  weight: ["800"],
  variable: "--font-noto-serif-sc",
});

export function PostTitle({ title }: { title: string }) {
  return (
    <h1
      className={`text-4xl lg:text-5xl ${nameDisplayFont.className}`}
      style={{
        fontFamily: `${nameDisplayFont.style.fontFamily}, ${chineseFallbackFont.style.fontFamily}, sans-serif`,
      }}
    >
      {title}
    </h1>
  );
}
