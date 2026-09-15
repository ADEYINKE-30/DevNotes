import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { mockLikes } from "../../data/mockBookmarks";

interface LikeButtonProps {
  postId: number;
}

const LikeButton = ({ postId }: LikeButtonProps) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(() =>
    mockLikes.some((l) => l.postId === postId && l.userId === user?.email),
  );
  const [likeCount, setLikeCount] = useState(() =>
    mockLikes.filter((l) => l.postId === postId).length,
  );

  const handleToggle = () => {
    if (!user) return;
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={handleToggle}
      disabled={!user}
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        liked
          ? "border-red-200 bg-red-50 text-red-500"
          : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
      } disabled:cursor-not-allowed disabled:opacity-50`}
      title={user ? (liked ? "Unlike" : "Like this article") : "Sign in to like"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={liked ? 0 : 1.5}
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
      {likeCount}
    </button>
  );
};

export default LikeButton;