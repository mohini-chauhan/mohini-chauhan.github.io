import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Toggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-12 h-6 rounded-full flex items-center"
    >
      {/* Track */}
      <motion.span
        className="absolute inset-0 rounded-full border"
        animate={{
          backgroundColor: isDark ? "#1f2933" : "#f3f4f6",
          borderColor: isDark ? "#374151" : "#d1d5db",
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Thumb */}
      <motion.span
        className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 24 : 2,
          backgroundColor: isDark ? "#020617" : "#ffffff",
          boxShadow: isDark
            ? "0 0 12px rgba(99,102,241,0.8)"
            : "0 1px 3px rgba(0,0,0,0.2)",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon */}
        <motion.span
          key={theme}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {isDark ? "🌙" : "☀️"}
        </motion.span>
      </motion.span>
    </button>
  );
}
