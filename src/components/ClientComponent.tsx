"use client";

import React from "react";

export function PostCardHeader({ title }: { title: string }) {
  const [fontSize, setFontSize] = React.useState(
    "text-3xl sm:text-4xl md:text-5xl"
  );

  const handleScroll = () => {
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    // 确保字体大小变化在移动端不会导致第一行字体卡住
    const newFontSize = `text-${Math.max(2, 5 - Math.floor(scrollPercentage * 3))}xl sm:text-${Math.max(3, 4 - Math.floor(scrollPercentage * 2))}xl md:text-${Math.max(4, 5 - Math.floor(scrollPercentage))}xl`;
    setFontSize(newFontSize);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 bg-white z-10 py-4 flex animate-slide-down flex-col w-full backdrop-blur-md bg-opacity-90">
      <h1 className={`${fontSize} transition-all duration-300`}>{title}</h1>
    </div>
  );
}
