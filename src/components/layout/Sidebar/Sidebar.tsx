import { NavLink } from "react-router-dom";
import { useState } from "react";

interface SidebarLink {
  label: string;
  path: string;
  icon: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Home", path: "/", icon: "🏠" },
  { label: "Articles", path: "/blog", icon: "📚" },
  { label: "Tutorials", path: "/videos", icon: "▶️" },
  { label: "Quizzes", path: "/quiz", icon: "🧠" },
  { label: "AI Assistant", path: "/assistant", icon: "✨" },
  { label: "Community", path: "/community", icon: "💬" },
  { label: "Bookmarks", path: "/bookmarks", icon: "🔖" },
];

const accountLinks: SidebarLink[] = [
  { label: "Profile", path: "/profile", icon: "👤" },
  { label: "Settings", path: "/settings", icon: "⚙️" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 md:relative md:z-0 ${
          collapsed ? "w-20" : "w-64"
        } ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-4 py-6">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold">
              D
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">DevNotes</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Learn. Build. Share.</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden rounded-lg p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 md:block"
              title="Toggle sidebar"
            >
              <span className="text-lg">◀</span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="space-y-2">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500/20 to-violet-600/20 text-purple-700 dark:text-purple-300 border-l-4 border-purple-500"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50"
                  } ${collapsed ? "justify-center px-3" : ""}`
                }
                title={collapsed ? link.label : undefined}
              >
                <span className="text-xl">{link.icon}</span>
                {!collapsed && <span className="font-medium">{link.label}</span>}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-200 dark:border-slate-700" />

          {/* Account Links */}
          <div className="space-y-2">
            {accountLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500/20 to-violet-600/20 text-purple-700 dark:text-purple-300 border-l-4 border-purple-500"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50"
                  } ${collapsed ? "justify-center px-3" : ""}`
                }
                title={collapsed ? link.label : undefined}
              >
                <span className="text-xl">{link.icon}</span>
                {!collapsed && <span className="text-sm font-medium">{link.label}</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-4">
          {!collapsed && (
            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
              DevNotes © 2026
            </p>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-3 flex w-full items-center justify-center rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 md:hidden"
          >
            <span className="text-sm">
              {collapsed ? "Expand" : "Collapse"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
