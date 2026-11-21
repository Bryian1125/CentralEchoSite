"use client";

import { motion } from "motion/react";
import Link from "next/link";

type EmptyCategoryProps = {
  categoryName: string;
};

export default function EmptyCategory({ categoryName }: EmptyCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-text/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h2 className="text-2xl md:text-3xl font-['Hefring_Slab_Bold'] text-text mb-2">
        No articles yet
      </h2>
      <p className="text-text/60 font-['NeueHaasGrotDisp'] mb-8 max-w-md mx-auto">
        There are no articles in the {categoryName} category yet. Check back soon!
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-['Hefring_Slab_Bold'] rounded-full hover:opacity-90 transition-opacity"
      >
        ← Back to Home
      </Link>
    </motion.div>
  );
}