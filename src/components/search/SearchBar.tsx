import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import { searchService } from "../../services/searchService";
import type { SearchResult } from "../../data/mockSearchData";

interface SearchBarProps {
  variant?: "header" | "full";
  onResultClick?: () => void;
}

const SearchBar = ({ variant = "header", onResultClick }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsLoading(false);
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
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    onResultClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
    if (e.key === "Enter" && results.length > 0) {
      navigate(results[0].url);
      handleResultClick();
    }
  };

  if (variant === "full") {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search blog posts, videos, and pages..."
            className="w-full rounded-panel border border-line bg-surface px-5 py-4 pl-12 text-base text-content placeholder:text-content-muted focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 dark:text-slate-500">
            🔍
          </span>
        </div>

        {isOpen && (
          <div className="mt-2">
            <SearchResults
              results={results}
              query={query}
              isLoading={isLoading}
              onResultClick={handleResultClick}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={searchRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="w-full min-w-0 rounded-control border border-line bg-surface px-3 py-2 pl-9 text-sm text-content placeholder:text-content-muted focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus/20 sm:w-48"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500">
        🔍
      </span>

      {isOpen && query.trim() && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(31.25rem,calc(100vw-2rem))]">
          <SearchResults
            results={results}
            query={query}
            isLoading={isLoading}
            onResultClick={handleResultClick}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
