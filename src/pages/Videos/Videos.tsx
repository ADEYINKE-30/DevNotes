import { useState, useEffect, useMemo } from "react";
import VideoCard from "../../components/video/VideoCard";
import CategoryFilter from "../../components/blog/CategoryFilter";
import { tutorialService, type Tutorial } from "../../services/tutorialService";

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        const response = await tutorialService.getTutorials({
          page: 1,
          limit: 100,
        });
        setTutorials(response.tutorials);
      } catch (err: any) {
        setError(err.message || "Failed to load tutorials");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  const categories = useMemo(
    () => [...new Set(tutorials.map((v) => v.category))],
    [tutorials],
  );

  const filteredVideos = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || tutorial.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Video Tutorials</h1>
          <p className="mt-8 text-slate-600 dark:text-slate-400">Loading tutorials...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Video Tutorials</h1>
          <div className="mt-8 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 p-4 text-red-700 dark:text-red-400">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Video Tutorials</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Learn through step-by-step video guides and tutorials.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <input
            type="text"
            placeholder="Search videos by title, instructor, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">No videos found.</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
            {tutorials.length === 0
              ? "No tutorials available yet."
              : "Try adjusting your search or filter."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((tutorial) => (
            <VideoCard 
              key={tutorial._id} 
              video={{
                id: tutorial.slug,
                title: tutorial.title,
                instructor: tutorial.instructor,
                category: tutorial.category,
                thumbnail: tutorial.thumbnail || 'https://via.placeholder.com/640x360?text=Tutorial',
                duration: `${tutorial.duration} min`,
                description: tutorial.description,
                youtubeId: '',
                views: 0,
                publishedAt: tutorial.publishedAt || tutorial.createdAt,
              }} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Videos;
