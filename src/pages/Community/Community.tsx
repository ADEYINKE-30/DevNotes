import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../../components/community/PostCard";
import { useAuth } from "../../hooks/useAuth";
import { communityService } from "../../services/communityService";
import type { Discussion } from "../../types/community";

const forumCategories = ["React", "TypeScript", "CSS", "JavaScript", "General", "Showcase"];

const Community = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        setError(null);
        setDiscussions(await communityService.getDiscussions());
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load discussions.");
      } finally {
        setLoading(false);
      }
    };

    void loadDiscussions();
  }, []);

  const filteredPosts = useMemo(() => {
    return discussions.filter((post) => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [discussions, selectedCategory, searchTerm]);

  const handleCreateDiscussion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedCategory = category.trim();

    if (!user) {
      setCreateError("Please log in to create a discussion.");
      return;
    }
    if (!trimmedTitle || !trimmedContent || !trimmedCategory) {
      setCreateError("Title, content, and category are required.");
      return;
    }

    try {
      setCreating(true);
      setCreateError(null);
      const createdDiscussion = await communityService.createDiscussion({
        title: trimmedTitle,
        content: trimmedContent,
        category: trimmedCategory,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });
      setDiscussions((currentDiscussions) => [createdDiscussion, ...currentDiscussions]);
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
    } catch (createErrorValue) {
      setCreateError(
        createErrorValue instanceof Error
          ? createErrorValue.message
          : "Failed to create discussion.",
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Community</h1>
        <p className="mt-3 text-gray-600">
          Discuss, share, and learn with fellow developers.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Start a discussion</h2>
        {user ? (
          <form onSubmit={(event) => void handleCreateDiscussion(event)} className="mt-4 space-y-4">
            {createError && <p className="text-sm text-red-600">{createError}</p>}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={creating}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="What would you like to discuss?"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              disabled={creating}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                disabled={creating}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Choose a category</option>
                {forumCategories.map((forumCategory) => (
                  <option key={forumCategory} value={forumCategory}>
                    {forumCategory}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Tags, separated by commas"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                disabled={creating}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create Discussion"}
            </button>
          </form>
        ) : (
          <p className="mt-3 text-sm text-gray-600">
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>{" "}
            to start a discussion.
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === ""
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {forumCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none sm:w-64"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">Loading discussions...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <p className="text-lg text-red-600">Unable to load discussions.</p>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">
            {discussions.length === 0 ? "No discussions yet." : "No discussions found."}
          </p>
          {discussions.length > 0 && (
            <p className="mt-2 text-sm text-gray-400">Try adjusting your search or filter.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Community;
