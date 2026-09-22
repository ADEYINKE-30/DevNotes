import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { communityService } from "../../services/communityService";
import type { Comment } from "../../types/community";

interface CommentSectionProps {
  discussionId: string;
  comments: Comment[];
  onCommentsChange: (comments: Comment[]) => void;
}

const CommentSection = ({ discussionId, comments, onCommentsChange }: CommentSectionProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setError(null), [comments]);

  const submitComment = async () => {
    const trimmedContent = content.trim();
    if (!user) {
      setError("Please log in to post a comment.");
      return;
    }
    if (!trimmedContent) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const newComment = await communityService.createComment(discussionId, trimmedContent, {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
      onCommentsChange([...comments, newComment]);
      setContent("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateComment = async (commentId: string) => {
    const trimmedContent = editingContent.trim();
    if (!trimmedContent) {
      setError("Comment cannot be empty.");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      const existingComment = comments.find((comment) => comment._id === commentId);
      const updatedComment = await communityService.updateComment(
        commentId,
        { content: trimmedContent },
        existingComment?.author,
      );
      onCommentsChange(comments.map((comment) => comment._id === commentId ? updatedComment : comment));
      setEditingId(null);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      setSubmitting(true);
      setError(null);
      await communityService.deleteComment(commentId);
      onCommentsChange(comments.filter((comment) => comment._id !== commentId));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete comment.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <div key={comment._id} className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">{comment.author.avatar || "👤"}</span>
                <span className="text-sm font-medium text-gray-900">{comment.author.name}</span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {editingId === comment._id ? (
                <div className="mt-2 flex gap-2">
                  <input value={editingContent} onChange={(event) => setEditingContent(event.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                  <button onClick={() => void updateComment(comment._id)} disabled={submitting} className="text-sm text-blue-600">Save</button>
                  <button onClick={() => setEditingId(null)} disabled={submitting} className="text-sm text-gray-500">Cancel</button>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">{comment.content}</p>
              )}
              {user?._id === comment.author._id && editingId !== comment._id && (
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => { setEditingId(comment._id); setEditingContent(comment.content); }} className="text-blue-600">Edit</button>
                  <button onClick={() => void deleteComment(comment._id)} disabled={submitting} className="text-red-600">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 px-6 py-4">
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a comment..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            disabled={submitting || !user}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button onClick={() => void submitComment()} disabled={submitting || !user} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? "Posting..." : "Post"}
          </button>
        </div>
        {!user && <p className="mt-2 text-xs text-gray-500"><Link to="/login" className="text-blue-600 hover:underline">Log in</Link> to post a comment.</p>}
      </div>
    </div>
  );
};

export default CommentSection;
