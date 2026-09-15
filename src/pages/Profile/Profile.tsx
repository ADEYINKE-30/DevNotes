import { useState } from "react";
import { Link } from "react-router-dom";

interface UserStats {
  articlesRead: number;
  tutorialsWatched: number;
  quizzesCompleted: number;
  currentStreak: number;
  savedResources: number;
  xpEarned: number;
}

const Profile = () => {
  const [stats] = useState<UserStats>({
    articlesRead: 24,
    tutorialsWatched: 12,
    quizzesCompleted: 8,
    currentStreak: 7,
    savedResources: 15,
    xpEarned: 2840,
  });

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Profile</h1>
            <p className="mt-2 text-slate-400">
              Manage your learning journey
            </p>
          </div>
          <Link
            to="/settings"
            className="rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-2 text-slate-300 hover:border-purple-500/50 hover:text-purple-300 transition"
          >
            Edit Settings
          </Link>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8 mb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-4xl">
              👤
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">
                Adepoju Adeyinka
              </h2>
              <p className="mt-1 text-purple-400 font-medium">
                Software Developer
              </p>
              <p className="mt-2 text-slate-400">
                Learning, building, and growing one project at a time.
              </p>

              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <span className="text-sm text-slate-300">
                    Level 12 Developer
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm text-slate-300">
                    {stats.currentStreak} day streak
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {[
            { icon: "📚", label: "Articles Read", value: stats.articlesRead },
            { icon: "▶️", label: "Tutorials Watched", value: stats.tutorialsWatched },
            { icon: "🧠", label: "Quizzes Completed", value: stats.quizzesCompleted },
            { icon: "🔥", label: "Current Streak", value: `${stats.currentStreak} days` },
            { icon: "🔖", label: "Saved Resources", value: stats.savedResources },
            { icon: "⭐", label: "XP Earned", value: stats.xpEarned },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{stat.icon}</span>
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h3>

          <div className="space-y-4">
            {[
              { activity: "Completed React Hooks tutorial", time: "2 hours ago", icon: "✅" },
              { activity: "Read article: Understanding TypeScript Generics", time: "1 day ago", icon: "📚" },
              { activity: "Completed JavaScript Basics Quiz", time: "2 days ago", icon: "🎯" },
              { activity: "Bookmarked: Advanced CSS Patterns", time: "3 days ago", icon: "🔖" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border border-slate-700 hover:border-purple-500/50 transition">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.activity}</p>
                  <p className="text-sm text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
