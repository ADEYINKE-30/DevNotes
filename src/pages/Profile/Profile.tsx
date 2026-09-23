import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { tutorialService } from "../../services/tutorialService";
import { quizService } from "../../services/quizService";
import { bookmarkService } from "../../services/bookmarkService";
import { blogService } from "../../services/blogService";
import { communityService } from "../../services/communityService";

interface UserStats {
  articlesRead: number;
  tutorialsWatched: number;
  quizzesCompleted: number;
  currentStreak: number;
  savedResources: number;
  xpEarned: number;
}

interface RecentActivity {
  activity: string;
  time: string;
  icon: string;
  href: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    articlesRead: 0,
    tutorialsWatched: 0,
    quizzesCompleted: 0,
    currentStreak: 0,
    savedResources: 0,
    xpEarned: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [adminCounts, setAdminCounts] = useState({ articles: 0, tutorials: 0, quizzes: 0, discussions: 0 });

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      Promise.all([
        blogService.getPosts({ page: 1, limit: 100 }),
        tutorialService.getTutorials({ page: 1, limit: 100 }),
        quizService.getQuizzes({ page: 1, limit: 100 }),
        communityService.getDiscussions(),
      ]).then(([posts, tutorials, quizzes, discussions]) => {
        setAdminCounts({
          articles: posts.posts.length,
          tutorials: tutorials.tutorials.length,
          quizzes: quizzes.quizzes.length,
          discussions: discussions.length,
        });
      }).catch(() => undefined);
      return;
    }

    const loadProfileStats = async () => {
      const [learningData, quizData] = await Promise.all([
        tutorialService.getLearningDashboard().catch(() => null),
        quizService.getQuizHistory().catch(() => ({ attempts: [] })),
      ]);
      const completedQuizzes = quizData.attempts.length;
      const completedTutorials = learningData?.tutorialsCompleted || 0;
      const bookmarks = bookmarkService.getAll(user._id);
      const savedResources = bookmarks.length;

      const tutorialActivity: RecentActivity[] = (learningData?.recentTutorials || [])
        .slice(0, 3)
        .map((item: any) => ({
          activity: `${item.completedAt ? "Completed" : "Started"} ${item.tutorial?.title || "tutorial"}`,
          time: item.lastWatchedAt || item.completedAt || item.startedAt,
          icon: item.completedAt ? "completed" : "started",
          href: "/videos",
        }));
      const quizActivity: RecentActivity[] = quizData.attempts.slice(0, 2).map((attempt) => ({
        activity: `Completed quiz with ${attempt.percentage}%`,
        time: attempt.submittedAt || attempt.startedAt,
        icon: "quiz",
        href: "/quiz",
      }));
      const bookmarkActivity: RecentActivity[] = bookmarks.slice(0, 2).map((bookmark) => ({
        activity: `Bookmarked: ${bookmark.title}`,
        time: bookmark.createdAt,
        icon: "bookmark",
        href: "/bookmarks",
      }));

      setStats({
        articlesRead: 0,
        tutorialsWatched: learningData?.tutorialsStarted || 0,
        quizzesCompleted: completedQuizzes,
        currentStreak: 0,
        savedResources,
        xpEarned: completedTutorials * 100 + completedQuizzes * 50,
      });
      setRecentActivity(
        [...tutorialActivity, ...quizActivity, ...bookmarkActivity]
          .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
          .slice(0, 5),
      );
    };

    loadProfileStats();
  }, [user]);

  if (user?.role === "admin") {
    return (
      <div className="min-h-screen bg-slate-950 py-8">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-400">Administration</p>
              <h1 className="mt-1 text-4xl font-bold text-white">Admin Profile</h1>
              <p className="mt-2 text-slate-400">Manage your administrator account and platform content.</p>
            </div>
            <Link to="/admin" className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-500">
              Admin Dashboard
            </Link>
          </div>

          <div className="mb-8 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-800 to-slate-900 p-8">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-600 text-xl font-semibold text-white">Admin</div>
              <div>
                <h2 className="text-3xl font-bold text-white">{user.name || user.email}</h2>
                <p className="mt-1 font-medium text-purple-400">Platform Administrator</p>
                <p className="mt-2 text-slate-400">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Articles", value: adminCounts.articles, href: "/admin/articles", icon: "Articles" },
              { label: "Tutorials", value: adminCounts.tutorials, href: "/admin/videos", icon: "Videos" },
              { label: "Quizzes", value: adminCounts.quizzes, href: "/admin/quizzes", icon: "Quizzes" },
              { label: "Discussions", value: adminCounts.discussions, href: "/community", icon: "Community" },
            ].map((item) => (
              <Link key={item.label} to={item.href} className="rounded-xl border border-slate-700 bg-slate-800 p-6 transition hover:-translate-y-1 hover:border-purple-500">
                <span className="text-3xl">{item.icon}</span>
                <p className="mt-4 text-sm text-slate-400">{item.label}</p>
                <p className="mt-1 text-3xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-xs font-medium text-purple-400">Manage {item.label} →</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-8">
            <h3 className="text-2xl font-bold text-white">Administrator Actions</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/admin/articles" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Post Article</Link>
              <Link to="/admin/videos" className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500">Post Video</Link>
              <Link to="/admin/users" className="rounded-lg border border-slate-600 px-5 py-3 font-semibold text-slate-200 hover:border-purple-400">Manage Users</Link>
              <Link to="/settings" className="rounded-lg border border-slate-600 px-5 py-3 font-semibold text-slate-200 hover:border-purple-400">Account Settings</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              User
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">
                {user?.name || user?.email || "Developer"}
              </h2>
              <p className="mt-1 text-purple-400 font-medium">
                Software Developer
              </p>
              <p className="mt-2 text-slate-400">
                Learning, building, and growing one project at a time.
              </p>

              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Level</span>
                  <span className="text-sm text-slate-300">
                    Level 12 Developer
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Streak</span>
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
            { icon: "Articles", label: "Articles Read", value: stats.articlesRead, href: "/blog" },
            { icon: "Tutorials", label: "Tutorials Watched", value: stats.tutorialsWatched, href: "/videos" },
            { icon: "Quizzes", label: "Quizzes Completed", value: stats.quizzesCompleted, href: "/quiz" },
            { icon: "Streak", label: "Current Streak", value: `${stats.currentStreak} days`, href: "/dashboard" },
            { icon: "Bookmarks", label: "Saved Resources", value: stats.savedResources, href: "/bookmarks" },
            { icon: "XP", label: "XP Earned", value: stats.xpEarned, href: "/dashboard" },
          ].map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
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
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h3>

          <div className="space-y-4">
            {recentActivity.length > 0 ? recentActivity.map((item, idx) => (
              <Link to={item.href} key={`${item.activity}-${idx}`} className="flex items-center gap-4 rounded-lg border border-slate-700 p-4 transition hover:border-purple-500/50">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.activity}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(item.time).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            )) : (
              <p className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-slate-400">
                Complete a tutorial, quiz, or bookmark an article to see activity here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
