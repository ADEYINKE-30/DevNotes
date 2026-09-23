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
    <div className="flex h-screen overflow-hidden bg-canvas text-content">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        {/* Header */}
        {showSidebar && (
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        )}

        {/* Page Content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer - only show on non-dashboard pages */}
        {!showSidebar && <Footer />}
      </div>

      {/* Floating AI Chat Toggle Button with label */}
      {!showAIChat && showSidebar && (
        <button
          onClick={toggleAIChat}
          className="group fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-tool border border-accent bg-accent px-4 py-2.5 text-white shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none sm:bottom-6 sm:right-6"
          title="Open AI Assistant"
          aria-label="Open AI Assistant"
        >
          <span aria-hidden="true" className="text-sm">Ask</span>
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
