"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function TypingAnimation({
  text,
  duration = 200,
  className
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(""); // 重置文本当 text 改变时

    const typingEffect = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => text.substring(0, currentIndex + 1));
        currentIndex += 1;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [text, duration]); // 正确的依赖数组

  return (
    <h1
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {displayedText || text}
    </h1>
  );
}
