import type { SearchResult } from "../../data/mockSearchData";
import SearchResultCard from "./SearchResultCard";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
  onResultClick: () => void;
}

const SearchResults = ({ results, query, isLoading, onResultClick }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-100" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-200" />
          <span className="ml-2 text-sm text-gray-500">Searching...</span>
        </div>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <p className="text-3xl">🔍</p>
        <p className="mt-2 text-sm text-gray-500">
          Start typing to search across blog posts, videos, and pages.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <p className="text-3xl">🔍</p>
        <p className="mt-2 text-sm font-medium text-gray-900">No results found</p>
        <p className="mt-1 text-xs text-gray-500">
          No results for "{query}". Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <p className="mb-3 px-2 text-xs text-gray-500">
        Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
      </p>
      <div className="space-y-2">
        {results.map((result) => (
          <SearchResultCard
            key={result.id}
            result={result}
            onClick={onResultClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
