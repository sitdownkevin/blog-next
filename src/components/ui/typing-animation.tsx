"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(""); // 重置文本当 text 改变时

    const typingEffect = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => text.substring(0, currentIndex + 1));
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
        "font-display text-center text-4xl font-bold leading-20 tracking-[-0.02em] drop-shadow-xs",
        className,
      )}
    >
      {displayedText || text}
    </h1>
  );
}
