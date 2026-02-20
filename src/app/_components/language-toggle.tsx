import Link from "next/link";
import { Languages } from "lucide-react";

export function LanguageToggle({ currentLang }: { currentLang: "en" | "zh" }) {
  const newLang = currentLang === "en" ? "zh" : "en";

  return (
    <Link
      href={`/?language=${newLang}`}
      className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/70 dark:hover:bg-gray-700/70 transition-colors opacity-30 hover:opacity-100 z-50 block"
      aria-label={`Switch to ${currentLang === "en" ? "中文" : "English"}`}
      title={`Switch to ${currentLang === "en" ? "中文" : "English"}`}
    >
      <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </Link>
  );
}
