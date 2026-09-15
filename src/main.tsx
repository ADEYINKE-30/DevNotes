import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AIProvider } from "./context/AIContext";
import "./index.css";
import App from "./App";

// Initialize theme before first render
const initializeTheme = () => {
  try {
    const stored = localStorage.getItem("devnotes:darkMode");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored !== null ? stored === "true" : prefersDark;
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {
    console.error("Failed to initialize theme:", e);
  }
};

initializeTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AIProvider>
          <App />
        </AIProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
