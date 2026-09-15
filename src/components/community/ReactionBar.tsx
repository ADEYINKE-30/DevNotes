import type { Reaction } from "../../data/mockCommunity";

interface ReactionBarProps {
  reactions: Reaction[];
}

const ReactionBar = ({ reactions }: ReactionBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm transition hover:bg-gray-50 hover:shadow-sm"
        >
          <span>{reaction.emoji}</span>
          <span className="text-xs font-medium text-gray-600">{reaction.count}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;
