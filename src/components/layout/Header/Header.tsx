import { useEffect, useRef, useState } from "react";
import SearchBar from "../../search/SearchBar";
import UserMenu from "../../auth/UserMenu";
import Notifications from "./Notifications.tsx";
import { notificationService } from "../../../services/notificationService";
import { Bell, Menu, Moon, Sun } from "lucide-react";

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
  const [unreadCount, setUnreadCount] = useState(0);
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

  useEffect(() => {
    notificationService.getUnreadCount().then(setUnreadCount).catch(() => setUnreadCount(0));
  }, [showNotifications]);

  return (
    <header className="border-b border-line bg-surface">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Left: Menu button (mobile) + Search */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control text-content-secondary transition-colors hover:bg-canvas hover:text-content focus-visible:outline-none md:hidden"
            title="Open navigation"
            aria-label="Open navigation"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
          <div className="min-w-0 max-w-md flex-1">
            <SearchBar />
          </div>
        </div>

        {/* Right: Theme + Notifications + User Menu */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-control text-content-secondary transition-colors hover:bg-canvas hover:text-content focus-visible:outline-none"
            title="Toggle theme"
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <Moon aria-hidden="true" className="h-4 w-4" /> : <Sun aria-hidden="true" className="h-4 w-4" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications((s) => !s)}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-control text-content-secondary transition-colors hover:bg-canvas hover:text-content focus-visible:outline-none"
              title="Notifications"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              aria-haspopup="dialog"
            >
              <Bell aria-hidden="true" className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-0 top-0 min-w-4 rounded-full bg-error px-1 text-center text-[10px] leading-4 text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
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
