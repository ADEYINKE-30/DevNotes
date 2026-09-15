import { Link } from "react-router-dom";
import type { SearchResult } from "../../data/mockSearchData";

interface SearchResultCardProps {
  result: SearchResult;
  onClick?: () => void;
}

const typeIcons: Record<string, string> = {
  blog: "📄",
  video: "🎬",
  page: "📋",
};

const SearchResultCard = ({ result, onClick }: SearchResultCardProps) => {
  return (
    <Link
      to={result.url}
      onClick={onClick}
      className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
    >
      <span className="mt-0.5 text-xl">{typeIcons[result.type] || "📄"}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {result.title}
          </h3>
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500">
            {result.type}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
          {result.description}
        </p>
        {result.category && (
          <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
            {result.category}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SearchResultCard;
