"use client";

import { useTheme } from "@wrksz/themes/client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Theme");
  const [mounted, setMounted] = useState(false);

  // 防止水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex shrink-0 items-center justify-center text-foreground/70 hover:text-claude-orange transition-colors duration-300 cursor-pointer"
      aria-label={t("toggle")}
    >
      {theme === "dark" ? (
        <FiSun className="text-yellow-400" size={16} />
      ) : (
        <FiMoon size={16} />
      )}
    </button>
  );
}
