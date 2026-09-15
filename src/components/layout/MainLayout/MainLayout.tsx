import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import { Sidebar } from "../Sidebar";
import Header from "../Header";
import Footer from "../Footer";
import AIChat from "../../ai/AIChat";
import { useAIContext } from "../../../context/AIContext";

const MainLayout = () => {
  const { showAIChat, toggleAIChat, closeAIChat } = useAIContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Pages that should not show the sidebar
  const noSidebarPages = ["/login", "/register", "/contact", "/about"];
  const showSidebar = !noSidebarPages.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        {showSidebar && (
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer - only show on non-dashboard pages */}
        {!showSidebar && <Footer />}
      </div>

      {/* Floating AI Chat Toggle Button with label */}
      {!showAIChat && showSidebar && (
        <button
          onClick={toggleAIChat}
          className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 px-5 py-3 text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          title="Open AI Assistant"
        >
          <span className="text-xl">✨</span>
          <span className="text-sm font-semibold">AI Assistant</span>
        </button>
      )}

      {/* Floating AI Chat Panel - always mounted to preserve state */}
      <div className={showAIChat ? "block" : "hidden"}>
        <AIChat onClose={closeAIChat} />
      </div>
    </div>
  );
};

export default MainLayout;
