import { useState, useMemo } from "react";
import PostCard from "../../components/community/PostCard";
import { mockForumPosts, forumCategories } from "../../data/mockCommunity";

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    return mockForumPosts.filter((post) => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const pinnedPosts = filteredPosts.filter((p) => p.isPinned);
  const regularPosts = filteredPosts.filter((p) => !p.isPinned);

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Community</h1>
        <p className="mt-3 text-gray-600">
          Discuss, share, and learn with fellow developers.
        </p>
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

      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">No discussions found.</p>
          <p className="mt-2 text-sm text-gray-400">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pinnedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {regularPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Community;
