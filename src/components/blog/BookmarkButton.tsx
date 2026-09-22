import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bookmarkService } from "../../services/bookmarkService";

interface BookmarkButtonProps {
  postId: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  image?: string;
}

const BookmarkButton = ({ postId, title, description, category, slug, image }: BookmarkButtonProps) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(() =>
    user ? bookmarkService.has(user._id, postId) : false,
  );

  const handleToggle = () => {
    if (!user) return;
    setBookmarked(bookmarkService.toggle(user._id, {
      postId,
      title,
      description,
      category,
      slug,
      image,
      createdAt: new Date().toISOString(),
    }));
  };

  return (
    <button
      onClick={handleToggle}
      disabled={!user}
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        bookmarked
          ? "border-blue-200 bg-blue-50 text-blue-600"
          : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
      } disabled:cursor-not-allowed disabled:opacity-50`}
      title={user ? (bookmarked ? "Remove bookmark" : "Bookmark this article") : "Sign in to bookmark"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={bookmarked ? 0 : 1.5}
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3-5 3V4z" />
      </svg>
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
};

export default BookmarkButton;