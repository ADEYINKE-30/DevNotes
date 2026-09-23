import type { Badge } from "../../data/mockGamification";
import { Award, BookOpen, Flame, Medal, PlaySquare, Puzzle, Star, Trophy } from "lucide-react";

interface BadgeIconProps {
  badge: Badge;
  size?: "sm" | "md" | "lg";
}

const BadgeIcon = ({ badge, size = "md" }: BadgeIconProps) => {
  const isUnlocked = !!badge.unlockedAt;
  const badgeIcons = { award: Award, book: BookOpen, flame: Flame, medal: Medal, play: PlaySquare, puzzle: Puzzle, star: Star, trophy: Trophy };
  const Icon = badgeIcons[badge.icon as keyof typeof badgeIcons] || Award;

  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-14 w-14 text-xl",
    lg: "h-20 w-20 text-3xl",
  };

  return (
    <div className="group relative flex flex-col items-center gap-1">
      <div
        className={`flex items-center justify-center rounded-xl transition-all ${sizeClasses[size]} ${
          isUnlocked
            ? "bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-sm ring-2 ring-yellow-300"
            : "bg-gray-100 ring-1 ring-gray-200 grayscale"
        }`}
      >
        <Icon aria-hidden="true" className={isUnlocked ? "" : "opacity-40"} />
      </div>
      <span className={`text-center text-[10px] font-medium ${
        isUnlocked ? "text-gray-700" : "text-gray-400"
      }`}>
        {badge.name}
      </span>
      <div className="absolute -bottom-1 left-1/2 z-10 hidden w-max max-w-40 -translate-x-1/2 translate-y-full rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
        <p className="font-medium">{badge.name}</p>
        <p className="mt-0.5 text-gray-300">{badge.description}</p>
        {isUnlocked && (
          <p className="mt-0.5 text-yellow-300">Unlocked: {badge.unlockedAt}</p>
        )}
        {!isUnlocked && <p className="mt-0.5 text-gray-400">Not yet unlocked</p>}
      </div>
    </div>
  );
};

export default BadgeIcon;
