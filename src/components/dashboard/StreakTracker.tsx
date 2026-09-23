import type { StreakData } from "../../data/mockProgress";
import { Flame } from "lucide-react";

interface StreakTrackerProps {
  streak: StreakData;
}

const StreakTracker = ({ streak }: StreakTrackerProps) => {
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold"><Flame aria-hidden="true" className="h-6 w-6 text-orange-500" /> Learning Streak</h2>
          <p className="mt-2 text-blue-100">
            You're on a{" "}
            <strong className="text-white">{streak.currentStreak}-day</strong>{" "}
            streak!
          </p>
          <p className="mt-1 text-sm text-blue-200">
            Keep it up to unlock your next badge.
          </p>

          <div className="mt-4 flex items-center gap-6 text-sm">
            <div>
              <span className="text-blue-200">Longest streak: </span>
              <span className="font-semibold text-white">
                {streak.longestStreak} days
              </span>
            </div>
            <div>
              <span className="text-blue-200">Total days: </span>
              <span className="font-semibold text-white">
                {streak.totalDays} days
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl font-extrabold">
            {streak.currentStreak}
          </div>
          <div className="mt-1 text-sm text-blue-200">day streak</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="mt-6">
        <p className="mb-3 text-sm text-blue-200">This week</p>
        <div className="flex gap-2">
          {streak.weeklyActivity.map((active, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div
                className={`h-8 w-8 rounded-lg transition-colors ${
                  active
                    ? "bg-white/90 shadow-sm"
                    : "bg-white/20"
                }`}
              />
              <span className="text-[10px] text-blue-200">
                {dayLabels[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StreakTracker;