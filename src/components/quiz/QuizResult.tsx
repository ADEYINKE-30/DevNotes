import { Award, BookOpen, ThumbsUp, Trophy } from "lucide-react";

interface QuizResultProps {
  score: number;
  total: number;
  percentage?: number;
  passed?: boolean;
  passingScore?: number;
  onRetry: () => void;
  onBack: () => void;
}

const QuizResult = ({ score, total, percentage: propPercentage, passed, passingScore, onRetry, onBack }: QuizResultProps) => {
  const percentage = propPercentage !== undefined ? propPercentage : Math.round((score / total) * 100);

  const getGrade = () => {
    if (passed !== undefined) {
      if (passed) {
        return { icon: Trophy, label: "Passed!", color: "text-green-600" };
      } else {
        return { icon: BookOpen, label: "Keep Learning!", color: "text-yellow-600" };
      }
    }

    // Fallback to percentage-based grading
    if (percentage >= 90) return { icon: Trophy, label: "Excellent!", color: "text-green-600" };
    if (percentage >= 70) return { icon: ThumbsUp, label: "Great Job!", color: "text-blue-600" };
    if (percentage >= 50) return { icon: Award, label: "Good Effort!", color: "text-yellow-600" };
    return { icon: BookOpen, label: "Keep Learning!", color: "text-gray-600" };
  };

  const grade = getGrade();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <grade.icon aria-hidden="true" className={`mx-auto h-14 w-14 ${grade.color}`} />

      <h2 className={`mt-4 text-2xl font-bold ${grade.color}`}>{grade.label}</h2>

      <div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-blue-100">
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-900">{score}</span>
          <span className="text-xl text-gray-500">/{total}</span>
          <p className="text-sm text-gray-400">{percentage}%</p>
        </div>
      </div>

      <p className="mt-4 text-gray-600">
        You answered {score} out of {total} questions correctly.
      </p>

      {passingScore !== undefined && (
        <p className="mt-2 text-sm text-gray-500">
          Passing score: {passingScore}%
        </p>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Back to Article
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
