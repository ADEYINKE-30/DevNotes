import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { tutorialService, type Tutorial, type Lesson } from "../../services/tutorialService";
import VideoPlayer from "../../components/video/VideoPlayer";
import WatchProgress from "../../components/video/WatchProgress";

const VideoDetails = () => {
  const { videoId } = useParams();
  const { user } = useAuth();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTutorial = async () => {
      if (!videoId) return;

      try {
        setLoading(true);
        setError("");

        // Fetch tutorial by ID
        const tutorialData = await tutorialService.getTutorialBySlug(videoId);
        setTutorial(tutorialData);

        // Fetch lessons
        const lessonsData = await tutorialService.getLessons(tutorialData._id);
        setLessons(lessonsData);
        
        // Set first lesson as current if available
        if (lessonsData.length > 0) {
          setCurrentLesson(lessonsData[0]);
        }

        // Fetch progress if user is authenticated
        if (user) {
          try {
            const progressData = await tutorialService.getTutorialProgress(tutorialData._id);
            setProgress(progressData);
          } catch {
            // Progress might not exist
            setProgress(null);
          }
        }

        // Fetch quizzes for this tutorial
        try {
          const { quizService } = await import("../../services/quizService");
          const quizzesData = await quizService.getQuizzes({ tutorial: tutorialData._id });
          setQuizzes(quizzesData.quizzes || []);
        } catch {
          // No quizzes available
          setQuizzes([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load tutorial");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [videoId, user]);

  const handleStartTutorial = async () => {
    if (!tutorial || !user) return;

    try {
      const progressData = await tutorialService.startTutorial(tutorial._id);
      setProgress(progressData);
    } catch (err: any) {
      console.error("Failed to start tutorial:", err);
    }
  };

  const handleCompleteLesson = async (lessonId: string) => {
    if (!tutorial || !user) return;

    try {
      const progressData = await tutorialService.completeLesson(tutorial._id, lessonId);
      setProgress(progressData);
    } catch (err: any) {
      console.error("Failed to complete lesson:", err);
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Link
          to="/videos"
          className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Videos
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading tutorial...</p>
        </div>
      </section>
    );
  }

  if (error || !tutorial) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Tutorial not found</h1>
        <p className="mt-4 text-gray-600">
          {error || "The tutorial you're looking for doesn't exist."}
        </p>
        <Link
          to="/videos"
          className="mt-6 inline-block font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Videos
        </Link>
      </section>
    );
  }

  const progressPercentage = progress?.progressPercentage || 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/videos"
        className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-800"
      >
        ← Back to Videos
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentLesson ? (
            <>
              {/* Check if it's a valid YouTube URL */}
              {currentLesson.videoUrl && (currentLesson.videoUrl.includes('youtube.com') || currentLesson.videoUrl.includes('youtu.be')) ? (
                <VideoPlayer 
                  youtubeId={currentLesson.videoUrl.split('/').pop()?.split('=').pop() || ''} 
                  title={currentLesson.title} 
                />
              ) : (
                <div className="w-full rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                  {/* Lesson Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-5xl">📹</div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                        <p className="text-blue-100">{currentLesson.description}</p>
                        <div className="mt-3 flex items-center gap-3 text-sm text-blue-100">
                          <span>⏱️ {currentLesson.duration}</span>
                          <span>•</span>
                          <span>Lesson {currentLesson.order}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  <div className="p-6">
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">📝 Lesson Content</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{currentLesson.content}</p>
                    </div>

                    {/* Resources */}
                    {currentLesson.resources && currentLesson.resources.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Resources</h3>
                        <div className="space-y-2">
                          {currentLesson.resources.map((resource: any, index: number) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition group"
                            >
                              <span className="text-blue-600">{resource.title}</span>
                              <span className="ml-auto text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Video Not Available Notice */}
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">ℹ️</span>
                        <div>
                          <p className="font-medium text-yellow-900">Video Coming Soon</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            The video content for this lesson is currently being prepared. 
                            Please refer to the written content and resources above.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="aspect-video w-full rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600">
                  {lessons.length > 0 ? "Select a lesson to start learning" : "No lessons available"}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tutorial.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>👤 {tutorial.instructor}</span>
                  <span>⏱️ {tutorial.duration} min</span>
                  <span>📚 {lessons.length} lessons</span>
                </div>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {tutorial.category}
              </span>
            </div>

            {user && (
              <div className="mt-4">
                <WatchProgress progress={progressPercentage / 100} />
                {!progress && (
                  <button
                    onClick={handleStartTutorial}
                    className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Start Learning
                  </button>
                )}
              </div>
            )}

            <p className="mt-4 text-gray-600">{tutorial.description}</p>

            {/* Difficulty Badge */}
            <div className="mt-4">
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {tutorial.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Lessons Sidebar */}
        <div>
          {lessons.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Course Content</h3>
              <p className="mt-1 text-sm text-gray-500">
                {lessons.length} lessons • {tutorial.duration} min total
              </p>

              <div className="mt-4 space-y-2">
                {lessons.map((lesson, index) => {
                  const isCompleted = progress?.completedLessons?.includes(lesson._id);
                  const isCurrent = currentLesson?._id === lesson._id;

                  return (
                    <button
                      key={lesson._id}
                      onClick={() => handleLessonClick(lesson)}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        isCurrent 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isCurrent
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {lesson.duration} min
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {user && currentLesson && !progress?.completedLessons?.includes(currentLesson._id) && (
                <button
                  onClick={() => handleCompleteLesson(currentLesson._id)}
                  className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Mark as Complete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quizzes Section */}
      {quizzes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Your Knowledge</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {quizzes.map((quiz) => (
              <Link
                key={quiz._id}
                to={`/quiz/${quiz._id}`}
                className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{quiz.description}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📝 {quiz.questions?.length || 0} questions</span>
                      {quiz.timeLimit && <span>⏱️ {quiz.timeLimit} min</span>}
                      <span>✅ Pass: {quiz.passingScore}%</span>
                    </div>
                  </div>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center text-sm font-semibold text-blue-600">
                    Take Quiz →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoDetails;
