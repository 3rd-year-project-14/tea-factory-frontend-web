import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`relative inline-flex items-center h-9 w-16 rounded-full transition-colors duration-300 ${
        isDark ? "bg-tea-800" : "bg-tea-100"
      } ${className}`}
    >
      <span
        className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-white dark:bg-card-dark shadow-soft flex items-center justify-center transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon size={14} className="text-tea-100" />
        ) : (
          <Sun size={14} className="text-earth-600" />
        )}
      </span>
    </button>
  );
}
