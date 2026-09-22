import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CommentSection from "../../components/community/CommentSection";
import { useAuth } from "../../hooks/useAuth";
import { communityService } from "../../services/communityService";
import type { Comment, Discussion, UpdateDiscussionData } from "../../types/community";

const Thread = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editTags, setEditTags] = useState("");

  const canManageDiscussion = Boolean(
    user && discussion && (user.role === "admin" || user._id === discussion.author._id),
  );

  useEffect(() => {
    if (!threadId) {
      setError("This discussion thread does not exist.");
      setLoading(false);
      return;
    }

    const loadThread = async () => {
      try {
        setError(null);
        const [loadedDiscussion, loadedComments] = await Promise.all([
          communityService.getDiscussion(threadId),
          communityService.getComments(threadId),
        ]);
        setDiscussion(loadedDiscussion);
        setComments(loadedComments);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load discussion.");
      } finally {
        setLoading(false);
      }
    };

    void loadThread();
  }, [threadId]);

  const startEditing = () => {
    if (!discussion) return;
    setEditTitle(discussion.title);
    setEditContent(discussion.content);
    setEditCategory(discussion.category || "");
    setEditTags(discussion.tags.join(", "));
    setError(null);
    setEditing(true);
  };

  const saveDiscussion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!discussion) return;

    const title = editTitle.trim();
    const content = editContent.trim();
    const category = editCategory.trim();
    if (!title || !content || !category) {
      setError("Title, content, and category are required.");
      return;
    }

    const data: UpdateDiscussionData = {
      title,
      content,
      category,
      tags: editTags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      setSaving(true);
      setError(null);
      const updatedDiscussion = await communityService.updateDiscussion(discussion._id, data);
      setDiscussion(updatedDiscussion);
      setEditing(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to update discussion.");
    } finally {
      setSaving(false);
    }
  };

  const deleteDiscussion = async () => {
    if (!discussion || !window.confirm("Delete this discussion? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleting(true);
      setError(null);
      await communityService.deleteDiscussion(discussion._id);
      navigate("/community");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete discussion.");
      setDeleting(false);
    }
  };

  if (loading) {
    return <section className="mx-auto max-w-4xl px-6 py-20 text-center">Loading discussion...</section>;
  }

  if (!discussion) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {error?.toLowerCase().includes("not found") || error?.includes("404")
            ? "Thread not found"
            : "Unable to load thread"}
        </h2>
        <p className="mt-2 text-gray-600">{error || "This discussion thread does not exist."}</p>
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
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {editing ? (
          <form onSubmit={(event) => void saveDiscussion(event)} className="space-y-4">
            <input
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              disabled={saving}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-2xl font-bold focus:border-blue-500 focus:outline-none"
            />
            <textarea
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
              disabled={saving}
              required
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={editCategory}
                onChange={(event) => setEditCategory(event.target.value)}
                disabled={saving}
                required
                placeholder="Category"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <input
                value={editTags}
                onChange={(event) => setEditTags(event.target.value)}
                disabled={saving}
                placeholder="Tags, separated by commas"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={() => setEditing(false)} disabled={saving} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 disabled:opacity-50">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
        {discussion.category && (
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {discussion.category}
            </span>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900">{discussion.title}</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">{discussion.content}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span className="text-lg">{discussion.author.avatar || "👤"}</span>
            {discussion.author.name}
          </span>
          <span>📅 {new Date(discussion.createdAt).toLocaleDateString()}</span>
        </div>
        {discussion.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {discussion.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {canManageDiscussion && (
          <div className="mt-5 flex gap-3 text-sm">
            <button onClick={startEditing} disabled={deleting} className="text-blue-600 hover:underline">Edit</button>
            <button onClick={() => void deleteDiscussion()} disabled={deleting} className="text-red-600 hover:underline">
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
          </>
        )}
      </div>

      <CommentSection discussionId={discussion._id} comments={comments} onCommentsChange={setComments} />
    </section>
  );
};

export default Thread;
