import { useParams, Link } from "react-router-dom";
import { mockForumPosts } from "../../data/mockCommunity";
import type { ForumPost } from "../../data/mockCommunity";
import ReactionBar from "../../components/community/ReactionBar";
import CommentSection from "../../components/community/CommentSection";

const Thread = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const post = mockForumPosts.find((p: ForumPost) => p.id === threadId);

  if (!post) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Thread not found</h2>
        <p className="mt-2 text-gray-600">This discussion thread does not exist.</p>
        <Link to="/community" className="mt-4 inline-block text-blue-600 hover:underline">
          &larr; Back to Community
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <Link to="/community" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline">
        &larr; Back to Community
      </Link>

      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {post.category}
          </span>
          {post.isPinned && (
            <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
              PINNED
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">{post.content}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span className="text-lg">{post.authorAvatar}</span>
            {post.author}
          </span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
          <span>👁️ {post.viewCount} views</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Reactions */}
      <div className="mb-8">
        <ReactionBar reactions={post.reactions} />
      </div>

      <CommentSection comments={post.comments} />
    </section>
  );
};

export default Thread;
