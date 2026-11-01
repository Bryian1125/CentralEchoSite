"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  basePath: string; // e.g., "/categories/opinion"
}

export default function Pagination({ currentPage, hasMore, basePath }: PaginationProps) {
  const searchParams = useSearchParams();
  const allParams = new URLSearchParams(searchParams.toString());

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = hasMore ? currentPage + 1 : null;

  const createUrl = (page: number) => {
    const params = new URLSearchParams(allParams);
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    return `${basePath}?${params.toString()}`;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {prevPage && (
        <Link
          href={createUrl(prevPage)}
          className="px-4 py-2 bg-background border border-border text-text font-['NeueHaasGrotDisp'] rounded-xl hover:bg-secondary hover:border-primary transition-colors"
          aria-label={`Page ${prevPage}`}
        >
          ← Previous
        </Link>
      )}

      <span className="px-4 py-2 text-text/60 font-['NeueHaasGrotDisp']">
        Page {currentPage}
      </span>

      {nextPage && (
        <Link
          href={createUrl(nextPage)}
          className="px-4 py-2 bg-background border border-border text-text font-['NeueHaasGrotDisp'] rounded-xl hover:bg-secondary hover:border-primary transition-colors"
          aria-label={`Page ${nextPage}`}
        >
          Next →
        </Link>
      )}
    </motion.nav>
  );
}