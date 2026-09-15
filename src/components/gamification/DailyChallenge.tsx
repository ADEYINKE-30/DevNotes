import type { DailyChallenge as DailyChallengeType } from "../../data/mockGamification";

interface DailyChallengeProps {
  challenges: DailyChallengeType[];
}

const DailyChallenge = ({ challenges }: DailyChallengeProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="font-semibold text-gray-900">Daily Challenges</h3>
        <p className="text-xs text-gray-400">Complete these today for bonus XP</p>
      </div>
      <div className="divide-y divide-gray-100">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  challenge.completed
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {challenge.completed ? "✓" : "○"}
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  challenge.completed ? "text-gray-500 line-through" : "text-gray-900"
                }`}>
                  {challenge.title}
                </p>
                <p className="text-xs text-gray-400">{challenge.description}</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
              +{challenge.xpReward} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyChallenge;
