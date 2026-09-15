import { Link } from "react-router-dom";
import type { ForumPost } from "../../data/mockCommunity";

interface PostCardProps {
  post: ForumPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const totalReactions = post.reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <Link
      to={`/community/${post.id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {post.isPinned && (
              <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                PINNED
              </span>
            )}
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {post.category}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.content}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="text-sm">{post.authorAvatar}</span>
          {post.author}
        </span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>👁️ {post.viewCount}</span>
        <span>💬 {post.comments.length}</span>
        <span>⭐ {totalReactions}</span>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500 ring-1 ring-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

export default PostCard;
