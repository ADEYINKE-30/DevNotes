import type { QuizQuestion as QuizQuestionType } from "../../services/quizService";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showResult: boolean;
}

const QuizQuestion = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showResult,
}: QuizQuestionProps) => {
  const getOptionStyle = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex
        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
    }

    if (question.correctAnswer && question.options[optionIndex] === question.correctAnswer) {
      return "border-green-500 bg-green-50 ring-2 ring-green-200";
    }

    if (
      selectedAnswer === optionIndex &&
      question.options[optionIndex] !== question.correctAnswer
    ) {
      return "border-red-500 bg-red-50 ring-2 ring-red-200";
    }

    return "border-gray-200 opacity-60";
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          Question {questionIndex + 1} of {totalQuestions}
        </span>
      </div>

      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && onSelectAnswer(index)}
            disabled={showResult}
            className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
              getOptionStyle(index)
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                showResult && question.options[index] === question.correctAnswer
                  ? "bg-green-500 text-white"
                  : showResult && selectedAnswer === index && question.options[index] !== question.correctAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-gray-700">{option}</span>
          </button>
        ))}
      </div>

      {showResult && (
        <div
          className={`mt-4 rounded-lg p-4 text-sm ${
            question.correctAnswer && question.options[selectedAnswer ?? -1] === question.correctAnswer
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          <p className="font-medium">
            {question.correctAnswer &&
            question.options[selectedAnswer ?? -1] === question.correctAnswer
              ? "✅ Correct!"
              : "❌ Incorrect"}
          </p>
          <p className="mt-1 text-gray-600">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
