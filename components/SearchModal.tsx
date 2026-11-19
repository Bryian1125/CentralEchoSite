"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
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

export default function SearchModal({ isOpen, onClose, triggerRect }: { isOpen: boolean; onClose: () => void; triggerRect?: DOMRect | null }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const originRef = useRef({ x: 0, y: 0 });

  const closeSearch = () => {
    setQuery("");
    setResults([]);
    setSelectedIndex(-1);
    setLoading(false);
    onClose();
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setSelectedIndex(-1);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 2) return;
    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setResults(data);
            setSelectedIndex(-1);
          }
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeSearch();
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
      closeSearch();
      router.push(result.href);
    }
  };

  const handleResultClick = (href: string) => {
    closeSearch();
    router.push(href);
  };

  if (!isOpen) return null;

  const originX = triggerRect ? triggerRect.left + triggerRect.width / 2 : window.innerWidth / 2;
  const originY = triggerRect ? triggerRect.top + triggerRect.height / 2 : 150;

  originRef.current = { x: originX, y: originY };

  const exitX = originRef.current.x - window.innerWidth / 2;
  const exitY = originRef.current.y - (window.innerHeight / 2 - 100);

  // Shadow via drop-shadow filter (not clipped by overflow-hidden) — less opaque, slightly blue
  const shadowFilter = "drop-shadow(0 25px 50px rgba(37, 148, 216, 0.15)) drop-shadow(0 0 1px rgba(37, 148, 216, 0.08))";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        onClick={closeSearch}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            x: originX - window.innerWidth / 2,
            y: originY - (window.innerHeight / 2 - 100),
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            x: exitX,
            y: exitY,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ filter: shadowFilter }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none"
        >
          {/* Modal — rounded-2xl + overflow-hidden clips content to all 4 rounded corners; shadow via filter (not clipped) */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              x: originX - window.innerWidth / 2,
              y: originY - (window.innerHeight / 2 - 100),
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: exitX,
              y: exitY,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto w-full max-w-2xl max-h-[calc(100vh-7rem)] flex flex-col bg-background rounded-2xl border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Section — no border lines */}
            <div className="relative p-4 shrink-0">
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-primary [mask-image:url('/assets/search.png')] [mask-size:contain] [mask-repeat:no-repeat]" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search articles..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl text-text placeholder-primary/60 font-['NeueHaasGrotDisp'] text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  style={{
                    background: "var(--color-background)",
                    border: "3px solid color-mix(in srgb, var(--color-primary) 15%, transparent)",
                    boxShadow: "inset 0 1px 0 rgba(37, 148, 216, 0.1)",
                  }}
                  autoComplete="off"
                  aria-label="Search articles"
                  aria-controls="search-results"
                  aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
                />
                {loading && (
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary animate-spin"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
              </div>
            </div>

            {/* Results — scrollable */}
            <ul id="search-results" className="flex-1 min-h-0 overflow-y-auto p-2">
              {results.map((result, index) => (
                <li key={result.id} className="py-1">
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
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={result.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
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
                    <svg
                      className="flex-shrink-0 text-primary transition-transform hover:scale-125"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              ))}
              {results.length === 0 && query.length >= 2 && !loading && (
                <li className="py-8 text-center text-text/50 font-['NeueHaasGrotDisp']">
                  No articles found for "{query}"
                </li>
              )}
            </ul>

            {/* Keyboard hints — no border line */}
            <div className="px-4 py-3 shrink-0 flex flex-col gap-2 items-center justify-between sm:flex-row bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-text font-['NeueHaasGrotDisp']">
                <kbd className="px-2 py-1 bg-secondary rounded border border-border">Esc</kbd>
                <span>to close</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text font-['NeueHaasGrotDisp']">
                <kbd className="px-2 py-1 bg-secondary rounded border border-border">↑</kbd>
                <kbd className="px-2 py-1 bg-secondary rounded border border-border">↓</kbd>
                <span>navigate</span>
                <kbd className="px-2 py-1 bg-secondary rounded border border-border">Enter</kbd>
                <span>open</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}