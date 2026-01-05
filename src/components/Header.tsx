import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 flex items-center gap-4 px-3.5 py-2 border-b border-border">
      <h1 className="text-xl font-bold header-foreground">Glad You’re Here 👋</h1>
      <label className="flex items-center cursor-pointer gap-2 relative w-10 h-6">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="peer sr-only"
          aria-label="Toggle theme"
        />
        <span className="block w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors"></span>
        <span className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full transition-transform duration-300 peer-checked:translate-x-4"></span>
      </label>
    </header>
  );
}
