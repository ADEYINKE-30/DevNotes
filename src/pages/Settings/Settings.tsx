import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Initialize dark mode from localStorage and sync with document
  const [settings, setSettings] = useState({
    darkMode: (() => {
      try {
        const stored = localStorage.getItem("devnotes:darkMode");
        if (stored !== null) return stored === "true";
      } catch (e) {}
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    })(),
    emailNotifications: true,
    desktopNotifications: false,
    newsletter: true,
    publicProfile: true,
    twoFactorAuth: false,
    language: "English",
  });

  // Sync dark mode with localStorage and document.documentElement
  useEffect(() => {
    try {
      localStorage.setItem("devnotes:darkMode", String(settings.darkMode));
    } catch (e) {}

    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSettings((prev) => ({
      ...prev,
      language: newLanguage,
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-8">
      <div className="mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Customize your DevNotes experience
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Appearance</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-purple-500/50 transition">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Use dark theme across the app
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("darkMode")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.darkMode
                      ? "bg-purple-600"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.darkMode ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
                <p className="font-medium text-slate-900 dark:text-white mb-3">Language</p>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    handleLanguageChange(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Notifications</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-purple-500/50 transition">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive email updates about new content
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.emailNotifications
                      ? "bg-purple-600"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.emailNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-purple-500/50 transition">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Desktop Notifications
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get notified on your desktop
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("desktopNotifications")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.desktopNotifications
                      ? "bg-purple-600"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.desktopNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-purple-500/50 transition">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Newsletter</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Subscribe to weekly digest emails
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("newsletter")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.newsletter
                      ? "bg-purple-600"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.newsletter
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Privacy</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-purple-500/50 transition">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Public Profile</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Allow others to see your profile
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("publicProfile")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.publicProfile
                      ? "bg-purple-600"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.publicProfile
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-purple-500/50 transition">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Add extra security to your account
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("twoFactorAuth")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.twoFactorAuth
                      ? "bg-purple-600"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.twoFactorAuth
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Account */}
          <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Account</h2>

            <div className="space-y-3">
              <button className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium">
                Change Password
              </button>
              <button className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium">
                Download Data
              </button>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="w-full rounded-lg border border-red-300 dark:border-red-600/30 bg-red-50 dark:bg-red-600/10 px-4 py-3 text-red-600 dark:text-red-400 hover:border-red-400 dark:hover:border-red-600/50 hover:bg-red-100 dark:hover:bg-red-600/20 transition font-medium"
              >
                Logout
              </button>
              <button className="w-full rounded-lg border border-red-300 dark:border-red-600/30 bg-red-50 dark:bg-red-600/10 px-4 py-3 text-red-600 dark:text-red-400 hover:border-red-400 dark:hover:border-red-600/50 hover:bg-red-100 dark:hover:bg-red-600/20 transition font-medium">
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
