import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

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
  const { user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-line bg-surface transition-[width,transform] duration-200 md:relative md:z-0 ${
          collapsed ? "w-20" : "w-64"
        } ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo Section */}
        <div className="flex min-h-20 items-center justify-between border-b border-line px-4 py-4">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-control bg-accent text-white font-bold">
              D
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-semibold text-content">DevNotes</h1>
                <p className="text-xs text-content-muted">Learn. Build. Share.</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden rounded-control p-1.5 text-content-secondary transition-colors hover:bg-canvas hover:text-content focus-visible:outline-none md:block"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <span className="text-lg">◀</span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-control border-l-2 px-3 py-2.5 transition-colors ${
                    isActive
                      ? "border-accent bg-accent-subtle text-accent"
                      : "border-transparent text-content-secondary hover:bg-canvas hover:text-content"
                  } ${collapsed ? "justify-center px-3" : ""}`
                }
                title={collapsed ? link.label : undefined}
              >
                <span aria-hidden="true" className="w-6 text-center text-base">{link.icon}</span>
                {!collapsed && <span className="text-sm font-medium">{link.label}</span>}
              </NavLink>
            ))}
            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-control border-l-2 px-3 py-2.5 transition-colors ${
                    isActive
                      ? "border-accent bg-accent-subtle text-accent"
                      : "border-transparent text-content-secondary hover:bg-canvas hover:text-content"
                  } ${collapsed ? "justify-center px-3" : ""}`
                }
                title={collapsed ? "Admin Panel" : undefined}
              >
                <span aria-hidden="true" className="w-6 text-center text-base">🛠️</span>
                {!collapsed && <span className="text-sm font-medium">Admin Panel</span>}
              </NavLink>
            )}
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-line" />

          {/* Account Links */}
          <div aria-label="Account navigation" className="space-y-1">
            {accountLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-control border-l-2 px-3 py-2.5 transition-colors ${
                    isActive
                      ? "border-accent bg-accent-subtle text-accent"
                      : "border-transparent text-content-secondary hover:bg-canvas hover:text-content"
                  } ${collapsed ? "justify-center px-3" : ""}`
                }
                title={collapsed ? link.label : undefined}
              >
                <span aria-hidden="true" className="w-6 text-center text-base">{link.icon}</span>
                {!collapsed && <span className="text-sm font-medium">{link.label}</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-line px-4 py-4">
          {!collapsed && (
            <p className="text-center text-xs text-content-muted">
              DevNotes © 2026
            </p>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-3 flex w-full items-center justify-center rounded-control p-2 text-content-secondary hover:bg-canvas hover:text-content focus-visible:outline-none md:hidden"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
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
