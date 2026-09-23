import { BarChart3, BookOpen, Eye, MessageSquare, TrendingDown, UserPlus, Users, Video } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  href?: string;
}

const StatsCard = ({ title, value, icon, change, changeType = "neutral", href }: StatsCardProps) => {
  const icons = { articles: BookOpen, videos: Video, quizzes: BarChart3, community: MessageSquare, views: Eye, users: Users, bounce: TrendingDown, signups: UserPlus };
  const Icon = icons[icon as keyof typeof icons] || BarChart3;
  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-500",
  };

  const card = (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`mt-1 text-sm ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <Icon aria-hidden="true" className="h-8 w-8 text-blue-600" />
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
      {card}
    </a>
  ) : card;
};

export default StatsCard;