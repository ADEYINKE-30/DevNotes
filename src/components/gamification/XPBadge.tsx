interface XPBadgeProps {
  xp: number;
  level: number;
}

const XPBadge = ({ xp, level }: XPBadgeProps) => {
  const levelColors = [
    "bg-gray-100 text-gray-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
  ];

  const colorClass = levelColors[Math.min(level, levelColors.length - 1)];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${colorClass}`}>
        {level}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">Level {level}</p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-2 w-24 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{ width: `${(xp % 1000) / 10}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{xp} XP</span>
        </div>
      </div>
    </div>
  );
};

export default XPBadge;
