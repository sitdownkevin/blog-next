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
      className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
      aria-label="切换主题"
    >
      {theme === "dark" ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
    </button>
  );
} 