import { NavLink } from "react-router-dom";
import { BarChart3, Beaker, FileText, LayoutDashboard, PlaySquare, Users } from "lucide-react";

const adminLinks = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/articles", label: "Articles", icon: FileText },
  { path: "/admin/videos", label: "Videos", icon: PlaySquare },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/quizzes", label: "Quizzes", icon: Beaker },
  { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

const Sidebar = () => {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <link.icon className="h-4 w-4" aria-hidden="true" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-gray-200 px-6 py-4">
        <NavLink
          to="/"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Back to Site
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;