import { Link } from "react-router-dom";
import { mockBookmarks } from "../../data/mockBookmarks";
import { posts } from "../../constants/posts";

const Bookmarks = () => {
  // Combine bookmarks with post details
  const bookmarkedPosts = mockBookmarks
    .map((bookmark) => {
      const post = posts.find((p) => p.id === bookmark.postId);
      return post ? { ...post, bookmarkedDate: bookmark.createdAt } : null;
    })
    .filter((item) => item !== null);

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Bookmarks</h1>
          <p className="mt-2 text-slate-400">
            {bookmarkedPosts.length} saved article{bookmarkedPosts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {bookmarkedPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarkedPosts.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden transition hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
              >
                {/* Image */}
                <div className="h-40 overflow-hidden bg-slate-700 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="text-4xl">📚</div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="inline-block rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300 border border-purple-500/30">
                      {item.category}
                    </span>
                    <button
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-red-400 transition"
                      title="Remove bookmark"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white group-hover:text-purple-300 transition line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-400 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-700">
                    <small className="text-slate-500">
                      Saved {item.bookmarkedDate}
                    </small>
                    <Link
                      to={`/blog/${item.slug}`}
                      className="text-purple-400 hover:text-purple-300 transition font-medium text-sm"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-700 border-dashed bg-slate-900/50 py-16">
            <div className="text-5xl mb-4">🔖</div>
            <h3 className="text-xl font-semibold text-slate-300">No Bookmarks Yet</h3>
            <p className="mt-2 text-slate-400">
              Start bookmarking articles and tutorials you want to revisit.
            </p>
            <Link
              to="/blog"
              className="mt-6 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:from-purple-500 hover:to-violet-500 hover:shadow-lg hover:shadow-purple-500/30"
            >
              Explore Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
