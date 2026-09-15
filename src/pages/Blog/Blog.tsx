import { useState, useEffect, useMemo } from "react";
import BlogCard from "../../components/blog/BlogCard";
import CategoryFilter from "../../components/blog/CategoryFilter";
import { blogService, type BlogPost } from "../../services/blogService";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await blogService.getPosts({
          page: 1,
          limit: 100,
        });
        setPosts(response.posts);
      } catch (err: any) {
        setError(err.message || "Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category))],
    [posts],
  );

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Articles</h1>
          <p className="mt-8 text-slate-600 dark:text-slate-400">Loading articles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Articles</h1>
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
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Articles</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Discover tutorials, tips, and modern web development insights.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <input
            type="text"
            placeholder="Search articles..."
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

      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">No articles found.</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
            {posts.length === 0
              ? "No articles available yet."
              : "Try adjusting your search or filter."}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard 
              key={post._id} 
              post={post} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
