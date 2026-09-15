import { useEffect, useRef, useState } from "react";
import SearchBar from "../../search/SearchBar";
import UserMenu from "../../auth/UserMenu";
import Notifications from "./Notifications.tsx";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("devnotes:darkMode");
      if (stored !== null) return stored === "true";
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("devnotes:darkMode", String(isDarkMode));
    } catch (e) {}

    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (!notifRef.current) return;
      if (e.target instanceof Node && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        {/* Left: Menu button (mobile) + Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 md:hidden"
            title="Toggle sidebar"
          >
            <span className="text-xl">☰</span>
          </button>
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* Right: Theme + Notifications + User Menu */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode((v) => !v)}
            className="rounded-lg p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle theme"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications((s) => !s)}
              className="relative rounded-lg p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Notifications"
              aria-expanded={showNotifications}
            >
              🔔
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <Notifications open={showNotifications} onClose={() => setShowNotifications(false)} />
          </div>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
