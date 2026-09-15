import type { QuizAttempt } from "../../data/mockQuizzes";

interface QuizHistoryProps {
  attempts: QuizAttempt[];
  quizTitles: Record<string, string>;
}

const QuizHistory = ({ attempts, quizTitles }: QuizHistoryProps) => {
  if (attempts.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <p className="text-gray-500">No quiz attempts yet.</p>
        <p className="mt-1 text-sm text-gray-400">
          Complete a quiz to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="font-semibold text-gray-900">Quiz History</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {attempts.map((attempt) => {
          const percentage = Math.round((attempt.score / attempt.total) * 100);

          const getScoreColor = () => {
            if (percentage >= 80) return "text-green-600";
            if (percentage >= 50) return "text-yellow-600";
            return "text-red-600";
          };

          return (
            <div key={attempt.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-gray-900">
                  {quizTitles[attempt.quizId] || "Unknown Quiz"}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {new Date(attempt.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getScoreColor()}`}>
                  {attempt.score}/{attempt.total}
                </p>
                <p className="text-xs text-gray-400">{percentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizHistory;
