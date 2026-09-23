import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "../../components/search/SearchBar";
import SearchResultCard from "../../components/search/SearchResultCard";
import { Search as SearchIcon } from "lucide-react";
import { searchService } from "../../services/searchService";
import type { SearchResult } from "../../data/mockSearchData";

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchService.search(q);
      setResults(searchResults);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(queryParam);
  }, [queryParam, performSearch]);

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Search</h1>
        <p className="mt-3 text-gray-600">
          Find blog posts, videos, and pages across DevNotes.
        </p>
      </div>

      <SearchBar variant="full" />

      {queryParam && (
        <div className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-100" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-200" />
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="mb-4 text-sm text-gray-500">
                Found {results.length} result{results.length !== 1 ? "s" : ""} for "{queryParam}"
              </p>
              <div className="space-y-3">
                {results.map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <SearchIcon aria-hidden="true" className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-lg font-medium text-gray-900">No results found</p>
              <p className="mt-1 text-sm text-gray-500">
                No results for "{queryParam}". Try a different search term.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Search;
