import type { Comment } from "../../data/mockCommunity";
import ReactionBar from "./ReactionBar";

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection = ({ comments }: CommentSectionProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="font-semibold text-gray-900">
          Comments ({comments.length})
        </h3>
      </div>

      {comments.length === 0 ? (
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-gray-500">No comments yet.</p>
          <p className="text-xs text-gray-400">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {comments.map((comment) => (
            <div key={comment.id} className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">{comment.authorAvatar}</span>
                <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{comment.content}</p>
              {comment.reactions.length > 0 && (
                <div className="mt-2">
                  <ReactionBar reactions={comment.reactions} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
