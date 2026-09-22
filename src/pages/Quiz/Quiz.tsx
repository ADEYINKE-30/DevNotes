import { useState, useCallback, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import QuizQuestion from "../../components/quiz/QuizQuestion";
import QuizResult from "../../components/quiz/QuizResult";
import QuizHistory from "../../components/quiz/QuizHistory";
import { quizService, type Quiz as QuizType, type QuizQuestion as QuizQuestionType } from "../../services/quizService";

type QuizPhase = "start" | "in-progress" | "result";

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [phase, setPhase] = useState<QuizPhase>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attemptId, setAttemptId] = useState("");
  const [quizResult, setQuizResult] = useState<any>(null);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<QuizType[]>([]);

  // Fetch quiz data on mount
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        // If no quiz ID, fetch all available quizzes
        try {
          setLoading(true);
          setError("");
          const response = await quizService.getQuizzes({ page: 1, limit: 100 });
          setAllQuizzes(response.quizzes);
        } catch (err: any) {
          console.error("Failed to fetch quizzes:", err);
          setError(err.message || "Failed to load quizzes");
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Get quiz by ID
        const quizData = await quizService.getQuizById(quizId);
        setQuiz(quizData);

        // Get quiz questions
        const questionsData = await quizService.getQuizQuestions(quizId);
        setQuestions(questionsData);

        // Get quiz history if user is authenticated
        if (user) {
          try {
            const results = await quizService.getQuizResults(quizId);
            setQuizHistory(results);
          } catch {
            // History might not exist, that's okay
            setQuizHistory([]);
          }
        }
      } catch (err: any) {
        console.error("Quiz fetch error:", err);
        setError(err.message || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, user]);

  const handleStart = async () => {
    if (!user) {
      // Redirect to login
      navigate(`/login?redirect=/quiz/${quizId}`);
      return;
    }

    if (!quiz) return;

    try {
      setError("");
      const response = await quizService.startQuiz(quiz._id);
      setAttemptId(response.attemptId);
      setPhase("in-progress");
      setCurrentQuestion(0);
      setAnswers(new Array(questions.length).fill(null));
      setShowResult(false);
    } catch (err: any) {
      setError(err.message || "Failed to start quiz");
    }
  };

  const handleSelectAnswer = useCallback(
    (index: number) => {
      if (showResult) return;
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = index;
        return next;
      });
    },
    [currentQuestion, showResult],
  );

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = async () => {
    if (!quiz || !attemptId) return;

    try {
      setError("");
      
      // Convert answers to backend format
      const formattedAnswers = answers.map((answer, index) => {
        if (answer === null) return { question: questions[index]._id, answer: "" };
        return {
          question: questions[index]._id,
          answer: questions[index].options[answer],
        };
      });

      const result = await quizService.submitQuiz(quiz._id, attemptId, formattedAnswers);
      setQuizResult(result);
      setPhase("result");
      setShowResult(true);

      // Refresh history
      if (user) {
        try {
          const results = await quizService.getQuizResults(quiz._id);
          setQuizHistory(results);
        } catch {
          // Ignore error
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit quiz");
    }
  };

  const handleRetry = () => {
    handleStart();
  };

  const handleBackToArticle = () => {
    navigate("/quiz");
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">Loading{quizId ? ' quiz' : ' quizzes'}...</p>
        </div>
      </section>
    );
  }

  // Show quiz list when no quiz ID
  if (!quizId) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Quizzes</h1>
          <p className="mt-3 text-gray-600">
            Test your knowledge with our interactive quizzes.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-center text-red-700">
            {error}
          </div>
        )}

        {allQuizzes.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg text-gray-500">No quizzes available yet.</p>
            <p className="mt-2 text-sm text-gray-400">
              Check back later or explore our tutorials.
            </p>
            <Link
              to="/videos"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Tutorials
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allQuizzes.map((quizItem) => (
              <Link
                key={quizItem._id}
                to={`/quiz/${quizItem._id}`}
                className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{quizItem.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{quizItem.description}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <span>📝</span>
                        {quizItem.questions?.length || 0} questions
                      </span>
                      {quizItem.timeLimit && (
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          {quizItem.timeLimit} min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span>✅</span>
                        Pass: {quizItem.passingScore}%
                      </span>
                    </div>

                    {typeof quizItem.tutorial === 'object' && quizItem.tutorial?.title && (
                      <div className="mt-3">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {quizItem.tutorial.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-3xl">🎯</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-flex items-center text-sm font-semibold text-blue-600">
                    Take Quiz →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    );
  }

  // Single quiz view error handling
  if (error && !quiz) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Quiz not found</h1>
        <p className="mt-4 text-gray-600">{error}</p>
        <div className="mt-6 space-x-4">
          <Link
            to="/quiz"
            className="inline-block font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Quizzes
          </Link>
          <Link
            to="/videos"
            className="inline-block font-medium text-blue-600 hover:text-blue-800"
          >
            Browse Tutorials →
          </Link>
        </div>
      </section>
    );
  }

  if (!quiz) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Quiz not found</h1>
        <p className="mt-4 text-gray-600">
          No quiz is available for this article.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            to="/quiz"
            className="inline-block font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Quizzes
          </Link>
          <Link
            to="/videos"
            className="inline-block font-medium text-blue-600 hover:text-blue-800"
          >
            Browse Tutorials →
          </Link>
        </div>
      </section>
    );
  }

  const quizTitles: Record<string, string> = {
    [quiz._id]: quiz.title,
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <Link
        to="/quiz"
        className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-800"
      >
        ← Back to Quizzes
      </Link>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {phase === "start" && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">📝</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="mt-2 text-gray-600">
            {quiz.description || `Test your knowledge with ${questions.length} questions.`}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Passing score: {quiz.passingScore}%
            {quiz.timeLimit && ` • Time limit: ${quiz.timeLimit} minutes`}
          </p>

          {!user && (
            <p className="mt-4 rounded-lg bg-yellow-100 p-3 text-sm text-yellow-700">
              Please log in to take this quiz
            </p>
          )}

          <button
            onClick={handleStart}
            className="mt-6 rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {user ? "Start Quiz" : "Log In to Start"}
          </button>

          {quizHistory.length > 0 && user && (
            <div className="mt-8">
              <QuizHistory attempts={quizHistory} quizTitles={quizTitles} />
            </div>
          )}
        </div>
      )}

      {phase === "in-progress" && questions.length > 0 && (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
              <span className="text-sm text-gray-500">
                {answers.filter((a) => a !== null).length}/{questions.length} answered
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{
                  width: `${
                    ((answers.filter((a) => a !== null).length) /
                      questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <QuizQuestion
            question={questions[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestion]}
            onSelectAnswer={handleSelectAnswer}
            showResult={showResult}
          />

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion((prev) => prev - 1);
                  setShowResult(false);
                }
              }}
              disabled={currentQuestion === 0}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={answers[currentQuestion] === null}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={answers[currentQuestion] === null}
                className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Finish Quiz
              </button>
            )}
          </div>
        </div>
      )}

      {phase === "result" && quizResult && (
        <div>
          <QuizResult
            score={quizResult.score}
            total={quizResult.totalPoints}
            percentage={quizResult.percentage}
            passed={quizResult.passed}
            passingScore={quiz.passingScore}
            onRetry={handleRetry}
            onBack={handleBackToArticle}
          />

          {quizHistory.length > 0 && (
            <div className="mt-6">
              <QuizHistory attempts={quizHistory} quizTitles={quizTitles} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Quiz;
