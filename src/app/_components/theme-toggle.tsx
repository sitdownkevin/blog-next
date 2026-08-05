"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
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
      className="text-foreground/70 hover:text-claude-orange transition-colors duration-300 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="text-yellow-400" size={18} />
      ) : (
        <FiMoon size={18} />
      )}
    </button>
  );
}
