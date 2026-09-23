import type { Reaction } from "../../data/mockCommunity";
import { Award, Flame, Heart, Lightbulb, Rocket, ThumbsUp } from "lucide-react";

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
          {reaction.emoji === "like" && <ThumbsUp aria-hidden="true" className="h-4 w-4" />}
          {reaction.emoji === "love" && <Heart aria-hidden="true" className="h-4 w-4" />}
          {reaction.emoji === "rocket" && <Rocket aria-hidden="true" className="h-4 w-4" />}
          {reaction.emoji === "idea" && <Lightbulb aria-hidden="true" className="h-4 w-4" />}
          {reaction.emoji === "award" && <Award aria-hidden="true" className="h-4 w-4" />}
          {reaction.emoji === "flame" && <Flame aria-hidden="true" className="h-4 w-4" />}
          <span className="text-xs font-medium text-gray-600">{reaction.count}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;
