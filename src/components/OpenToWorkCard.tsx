import Card from "./Card";
import { useTheme } from "../context/ThemeContext";

export default function OpenToWorkCard() {
  const { theme } = useTheme();

  return (
    <Card className="p-4">
      {/* Header with animated status */}
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <h4 className="header-foreground font-semibold">Open to Work</h4>
      </div>

      {/* Preference badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            theme === "dark"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
        >
          Remote
        </span>
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            theme === "dark"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              : "bg-purple-50 text-purple-700 border border-purple-200"
          }`}
        >
          Full-time
        </span>
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            theme === "dark"
              ? "bg-green-500/20 text-green-300 border border-green-500/30"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          Contract
        </span>
      </div>

      {/* Tagline */}
      <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        Looking for exciting frontend opportunities. Let's build something great together!
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-2">
        <a
          href="mailto:mohini.chauhan@example.com"
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            theme === "dark"
              ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          }`}
        >
          <span>Contact</span>
        </a>
        <a
          href="https://linkedin.com/in/mohini-chauhan"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            theme === "dark"
              ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
          }`}
        >
          <span>LinkedIn</span>
        </a>
      </div>
    </Card>
  );
}
