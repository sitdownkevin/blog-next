import { Anton, Noto_Sans_SC } from "next/font/google";

const nameDisplayFont = Anton({
  weight: ["400"],
});

const chineseFallbackFont = Noto_Sans_SC({
  weight: ["400"],
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
