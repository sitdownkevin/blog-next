"use client";

import { useState, useEffect, useRef } from "react";
import { CheckIcon, CopyIcon } from "lucide-react"; // Assuming lucide-react is used for icons

interface MarkdownCodeBlockProps {
  code: string;
  language?: string;
}

export function MarkdownCodeBlock({ code, language }: MarkdownCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000); // Reset copied state after 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
      });
  };

  // Optional: Add a way to dynamically load Prism.js language if needed
  // useEffect(() => {
  //   if (language && typeof window !== 'undefined' && window.Prism) {
  //     window.Prism.highlightAll(); // Or highlight specific block
  //   }
  // }, [code, language]);

  return (
    <div className="relative group">
      <button
        ref={buttonRef}
        className={`absolute hidden group-hover:flex items-center justify-center right-2 top-2
                   ${copied ? "bg-emerald-600/70 hover:bg-emerald-500/80 ring-emerald-400/30" : "bg-zinc-500/50 hover:bg-zinc-400/60 text-zinc-100 hover:text-white ring-zinc-400/20 hover:ring-zinc-300/30"}
                   rounded-md w-8 h-8
                   transition-all duration-200 ease-in-out
                   shadow-xs hover:shadow-md
                   ring-1`}
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <CopyIcon className="w-4 h-4" />
        )}
      </button>
      {/* The pre and code tags will be rendered by the markdown pipeline */}
      {/* This component will replace the original pre/code structure */}
      {/* We will dynamically insert the original pre/code HTML here */}
      {/* For now, we'll just render the code string, but the final implementation will use the original HTML */}
      <pre className="bg-slate-100 dark:bg-zinc-800 border border-zinc-400/20 dark:border-zinc-700 rounded-md">
        <code
          className={`language-${language} font-sans text-zinc-900 dark:text-zinc-100 rounded-md p-2`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
