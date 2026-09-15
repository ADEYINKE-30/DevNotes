import type { WeeklyGoal } from "../../data/mockGamification";

interface WeeklyGoalsProps {
  goals: WeeklyGoal[];
}

const WeeklyGoals = ({ goals }: WeeklyGoalsProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="font-semibold text-gray-900">Weekly Goals</h3>
        <p className="text-xs text-gray-400">Progress towards your weekly targets</p>
      </div>
      <div className="divide-y divide-gray-100">
        {goals.map((goal) => {
          const percentage = Math.round((goal.progress / goal.target) * 100);
          return (
            <div key={goal.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                <span className="text-xs text-gray-400">
                  {goal.progress}/{goal.target}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-gray-400">{percentage}% complete</span>
                <span className="text-xs font-medium text-blue-700">+{goal.xpReward} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyGoals;
