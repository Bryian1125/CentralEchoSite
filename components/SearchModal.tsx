"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SearchResult = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  href: string;
  category: string;
  image: string | null;
};

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce(async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setSelectedIndex(-1);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const result = results[selectedIndex];
      onClose();
      router.push(result.href);
    }
  };

  const handleResultClick = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-2xl bg-background rounded-2xl border border-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="relative p-4 border-b border-border">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl text-text placeholder-text/40 font-['NeueHaasGrotDisp'] text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoComplete="off"
                aria-label="Search articles"
                aria-controls="search-results"
                aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
              />
              {loading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </motion.div>
              )}
            </div>
            <p className="mt-2 text-sm text-text/50 font-['NeueHaasGrotDisp']">
              {query.length < 2 && "Type at least 2 characters to search"}
              {query.length >= 2 && !loading && results.length === 0 && "No results found"}
              {query.length >= 2 && !loading && results.length > 0 && `${results.length} result${results.length !== 1 ? "s" : ""} found`}
            </p>
          </div>

          {/* Results */}
          <AnimatePresence mode="popLayout">
            <motion.ul
              id="search-results"
              className="max-h-[60vh] overflow-y-auto p-2"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {results.map((result, index) => (
                <motion.li
                  key={result.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    id={`search-result-${index}`}
                    onClick={() => handleResultClick(result.href)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleResultClick(result.href);
                      }
                    }}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors ${
                      selectedIndex === index ? "bg-primary/10" : "hover:bg-secondary/50"
                    }`}
                    role="option"
                    aria-selected={selectedIndex === index}
                  >
                    {result.image && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-secondary"
                      >
                        <Image
                          src={result.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </motion.div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {result.category && (
                          <span className="px-2 py-0.5 text-xs font-['Hefring_Slab_Bold'] uppercase tracking-wider bg-primary text-background rounded-full">
                            {result.category}
                          </span>
                        )}
                      </div>
                      <h3 className="font-['NeueHaasGrotDisp'] font-semibold text-text line-clamp-1">
                        {result.title}
                      </h3>
                      {result.excerpt && (
                        <p className="mt-1 text-sm text-text/60 font-['NeueHaasGrotDisp'] line-clamp-2">
                          {result.excerpt}
                        </p>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="flex-shrink-0 text-primary"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </button>
                </motion.li>
              ))}
              {results.length === 0 && query.length >= 2 && !loading && (
                <li className="py-8 text-center text-text/50 font-['NeueHaasGrotDisp']">
                  No articles found for "{query}"
                </li>
              )}
            </motion.ul>
          </AnimatePresence>

          {/* Keyboard hint */}
          <div className="px-4 py-3 border-t border-border text-xs text-text/40 font-['NeueHaasGrotDisp'] flex items-center justify-between">
            <kbd className="px-2 py-0.5 bg-secondary rounded border border-border">Esc</kbd> to close
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 bg-secondary rounded border border-border">↑</kbd>
              <kbd className="px-2 py-0.5 bg-secondary rounded border border-border">↓</kbd>
              to navigate
              <kbd className="px-2 py-0.5 bg-secondary rounded border border-border">Enter</kbd>
              to open
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  }) as T;
}