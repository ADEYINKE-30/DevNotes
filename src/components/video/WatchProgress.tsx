interface WatchProgressProps {
  progress: number; // 0 to 1
}

const WatchProgress = ({ progress }: WatchProgressProps) => {
  const percentage = Math.round(progress * 100);

  const getProgressColor = () => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 50) return "bg-blue-500";
    if (percentage >= 25) return "bg-yellow-500";
    return "bg-gray-300";
  };

  if (percentage === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100">
        <div
          className={`h-1.5 rounded-full transition-all ${getProgressColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-400">
        {percentage >= 100 ? "Completed" : `${percentage}%`}
      </span>
    </div>
  );
};

export default WatchProgress;