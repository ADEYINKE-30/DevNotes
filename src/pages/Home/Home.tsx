import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/home/Hero";
import FeaturedPosts from "../../components/home/FeaturedPosts";
import LatestPosts from "../../components/home/LatestPosts";
import Newsletter from "../../components/home/Newsletter";
import Footer from "../../components/layout/Footer";
import { tutorialService, type Tutorial } from "../../services/tutorialService";
import { quizService, type Quiz } from "../../services/quizService";
import { useAIContext } from "../../context/AIContext";

const Home = () => {
  const { toggleAIChat } = useAIContext();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [learningLoading, setLearningLoading] = useState(true);
  const [learningError, setLearningError] = useState("");

  useEffect(() => {
    const fetchLearningContent = async () => {
      try {
        setLearningLoading(true);
        setLearningError("");
        const [tutorialResponse, quizResponse] = await Promise.all([
          tutorialService.getTutorials({ page: 1, limit: 3 }),
          quizService.getQuizzes({ page: 1, limit: 3 }),
        ]);
        setTutorials(tutorialResponse.tutorials);
        setQuizzes(quizResponse.quizzes);
      } catch (err: any) {
        setLearningError(err.message || "Learning content is temporarily unavailable.");
      } finally {
        setLearningLoading(false);
      }
    };

    fetchLearningContent();
  }, []);

  return (
    <>
      <Hero />
      <FeaturedPosts />
      <LatestPosts />

      <section className="border-y border-line bg-surface" aria-labelledby="learning-heading">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Learn by doing</p>
              <h2 id="learning-heading" className="mt-2 text-3xl font-semibold tracking-tight text-content sm:text-4xl">Build your next skill</h2>
              <p className="mt-3 max-w-xl text-content-secondary">Follow a practical tutorial, then check your understanding with a short quiz.</p>
            </div>
            <Link to="/videos" className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline-none">Browse all tutorials <span aria-hidden="true">-&gt;</span></Link>
          </div>

          {learningLoading && <p className="mt-8 text-sm text-content-muted">Loading learning paths...</p>}
          {learningError && <p className="mt-8 rounded-panel border border-line bg-canvas p-4 text-sm text-error">{learningError}</p>}
          {!learningLoading && !learningError && (
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)]">
              <div className="border-t-2 border-accent pt-4">
                <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                  <h3 className="text-lg font-semibold text-content">Tutorials</h3>
                  <span className="text-xs text-content-muted">Start here</span>
                </div>
                <div className="divide-y divide-line border-y border-line">
                  {tutorials.length === 0 ? <p className="py-6 text-sm text-content-muted">No tutorials available yet.</p> : tutorials.map((tutorial) => (
                    <Link key={tutorial._id} to={`/videos/${tutorial.slug}`} className="group grid gap-4 py-5 sm:grid-cols-[9rem_1fr]">
                      <div className="aspect-video overflow-hidden rounded-panel bg-canvas">
                        {tutorial.thumbnail && <img src={tutorial.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-content-muted"><span>{tutorial.category}</span><span>{tutorial.difficulty}</span><span>{tutorial.duration} min</span></div>
                        <h4 className="mt-2 text-lg font-semibold text-content transition-colors group-hover:text-accent">{tutorial.title}</h4>
                        <p className="mt-1 line-clamp-2 text-sm text-content-secondary">{tutorial.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t-2 border-content-secondary pt-4">
                <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                  <h3 className="text-lg font-semibold text-content">Practice</h3>
                  <Link to="/quiz" className="text-xs font-semibold text-accent hover:text-accent-hover">All quizzes</Link>
                </div>
                <div className="space-y-3">
                  {quizzes.length === 0 ? <p className="py-6 text-sm text-content-muted">No quizzes available yet.</p> : quizzes.map((quiz) => (
                    <Link key={quiz._id} to={`/quiz/${quiz._id}`} className="group block rounded-panel border border-line bg-canvas p-4 transition-colors hover:border-accent focus-visible:outline-none">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">Knowledge check</p>
                      <h4 className="mt-2 font-semibold text-content group-hover:text-accent">{quiz.title}</h4>
                      <p className="mt-1 line-clamp-2 text-sm text-content-secondary">{quiz.description}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-content-muted"><span>{quiz.questions?.length || 0} questions</span>{quiz.timeLimit && <span>{quiz.timeLimit} min</span>}<span>Pass: {quiz.passingScore}%</span></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-14" aria-labelledby="assistant-heading">
        <div className="flex flex-col justify-between gap-6 border-y border-line bg-surface-elevated px-5 py-6 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">A clearer explanation</p>
            <h2 id="assistant-heading" className="mt-2 text-2xl font-semibold text-content">Stuck on a concept?</h2>
            <p className="mt-2 max-w-xl text-sm text-content-secondary">Ask DevNotes AI for a practical explanation while you learn.</p>
          </div>
          <button type="button" onClick={toggleAIChat} className="shrink-0 rounded-control bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none">Ask DevNotes AI</button>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;