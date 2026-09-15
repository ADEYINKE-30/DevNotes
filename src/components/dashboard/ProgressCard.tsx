import { Link } from "react-router-dom";
import type { LessonProgress } from "../../data/mockProgress";

interface ProgressCardProps {
  lesson: LessonProgress;
}

const ProgressCard = ({ lesson }: ProgressCardProps) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-gray-300";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      React: "bg-blue-100 text-blue-700",
      TypeScript: "bg-indigo-100 text-indigo-700",
      "Tailwind CSS": "bg-cyan-100 text-cyan-700",
      CSS: "bg-purple-100 text-purple-700",
      JavaScript: "bg-yellow-100 text-yellow-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <Link
      to={`/blog/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(lesson.category)}`}
          >
            {lesson.category}
          </span>
          {lesson.completed && (
            <span className="text-sm text-green-600">✅ Completed</span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {lesson.title}
        </h3>

        <p className="mt-2 text-sm text-gray-500">{lesson.readTime}</p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span
              className={`font-medium ${lesson.progress >= 100 ? "text-green-600" : "text-blue-600"}`}
            >
              {lesson.progress}%
            </span>
          </div>
          <div className="mt-1 h-2.5 w-full rounded-full bg-gray-100">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor(lesson.progress)}`}
              style={{ width: `${lesson.progress}%` }}
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Last accessed: {new Date(lesson.lastAccessed).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default ProgressCard;