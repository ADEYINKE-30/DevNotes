import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { tutorialService } from "../../services/tutorialService";
import { quizService } from "../../services/quizService";
import ProgressCard from "../../components/dashboard/ProgressCard";
import StreakTracker from "../../components/dashboard/StreakTracker";
import type { StreakData } from "../../data/mockProgress";

const Dashboard = () => {
  const { user } = useAuth();
  const [learningData, setLearningData] = useState<any>(null);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Fetch learning dashboard data
        const dashboardData = await tutorialService.getLearningDashboard();
        setLearningData(dashboardData);

        // Fetch quiz history
        try {
          const quizData = await quizService.getQuizHistory();
          setQuizHistory(quizData.attempts || []);
        } catch {
          // Quiz history might not exist
          setQuizHistory([]);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (!user) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-4 text-gray-600">Please log in to view your dashboard</p>
        </div>
      </section>
    );
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Welcome back, {user?.name || user?.email?.split("@")[0] || "Developer"} 👋
          </h1>
          <p className="mt-8 text-gray-600">Loading your dashboard...</p>
        </div>
      </section>
    );
  }

  // Mock streak data (can be enhanced later)
  const mockStreak: StreakData = {
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    todayActive: false,
    weeklyActivity: [false, false, false, false, false, false, false],
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.name || user?.email?.split("@")[0] || "Developer"} 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Pick up where you left off and continue learning.
        </p>
      </div>

      {/* Learning Stats */}
      {learningData && (
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Tutorials Started</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {learningData.tutorialsStarted || 0}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Tutorials Completed</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {learningData.tutorialsCompleted || 0}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Lessons Completed</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {learningData.lessonsCompleted || 0}
            </p>
          </div>
        </div>
      )}

      {/* Continue Learning */}
      {learningData?.inProgress && learningData.inProgress.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Continue Learning</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningData.inProgress.map((progress: any) => (
              <ProgressCard 
                key={progress._id} 
                lesson={{
                  postId: progress.tutorial._id || progress.tutorial,
                  title: progress.tutorial?.title || "Tutorial",
                  category: progress.tutorial?.category || "Tutorial",
                  readTime: progress.tutorial?.duration || "",
                  progress: progress.progressPercentage || 0,
                  lastAccessed: progress.lastWatchedAt || new Date().toISOString(),
                  completed: false,
                }} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Learning Streak */}
      <div className="mb-12">
        <StreakTracker streak={mockStreak} />
      </div>

      {/* Recent Tutorials */}
      {learningData?.recentTutorials && learningData.recentTutorials.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
          <div className="space-y-4">
            {learningData.recentTutorials.slice(0, 5).map((progress: any) => (
              <div 
                key={progress._id} 
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {progress.tutorial?.title || "Tutorial"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {progress.progressPercentage || 0}% complete
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {progress.completedAt 
                      ? "Completed" 
                      : `Last watched: ${new Date(progress.lastWatchedAt).toLocaleDateString()}`
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz History */}
      {quizHistory.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Recent Quiz Results</h2>
          <div className="space-y-4">
            {quizHistory.slice(0, 5).map((attempt: any) => (
              <div 
                key={attempt._id} 
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Quiz Attempt
                    </h3>
                    <p className="text-sm text-gray-500">
                      Score: {attempt.score} points ({attempt.percentage}%)
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${attempt.passed ? 'text-green-600' : 'text-yellow-600'}`}>
                    {attempt.passed ? "Passed ✓" : "Not Passed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Tutorials - will be enhanced with AI recommendations later */}
      {learningData?.inProgress?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Learning Journey</h3>
          <p className="text-gray-600 mb-6">Browse our tutorials to get started</p>
          <a 
            href="/videos" 
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Tutorials
          </a>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
