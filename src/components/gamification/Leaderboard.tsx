import type { XPEntry } from "../../data/mockGamification";

interface LeaderboardProps {
  entries: XPEntry[];
}

const Leaderboard = ({ entries }: LeaderboardProps) => {
  const sorted = [...entries].sort((a, b) => b.xp - a.xp);

  const getRankStyle = (index: number) => {
    if (index === 0) return "bg-yellow-50 border-yellow-300 ring-1 ring-yellow-400";
    if (index === 1) return "bg-gray-50 border-gray-300";
    if (index === 2) return "bg-orange-50 border-orange-300";
    return "border-gray-200";
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="font-semibold text-gray-900">Leaderboard</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {sorted.map((entry, index) => (
          <div
            key={entry.userId}
            className={`flex items-center gap-4 px-6 py-4 ${getRankStyle(index)}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold">
              {getRankBadge(index)}
            </span>
            <span className="text-lg">{entry.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {entry.username}
              </p>
              <p className="text-xs text-gray-400">Level {entry.level}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{entry.xp.toLocaleString()}</p>
              <p className="text-xs text-gray-400">XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
