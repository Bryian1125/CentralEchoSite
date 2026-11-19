"use client";

import type { Article } from "@/lib/content";
import NextImage from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";
import { motion } from "motion/react";

const MotionImage = motion(NextImage);

type SpotlightArticleProps = {
  article: Article;
};

export default function SpotlightArticle({ article }: SpotlightArticleProps) {
  return (
    <Link href={article.href} className="block mx-auto">
      <motion.div
        whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-4xl h-90 bg-secondary rounded-2xl relative overflow-clip text-left"
      >
        {/* Featured Image */}
        {article.image && (
          <div className="absolute inset-0 z-0">
            <MotionImage
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col h-full justify-end p-6">
          <span className="inline-block w-fit px-3 py-1 text-xs font-['Hefring_Slab_Bold'] uppercase tracking-wider bg-primary text-background rounded-full mb-3">
            {article.category}
          </span>
          <motion.h2
            whileHover={{ x: 4, color: "var(--color-primary)" }}
            className="text-text font-bold text-2xl md:text-3xl font-['NeueHaasGrotDisp'] mb-2 transition-colors"
          >
            {article.title}
          </motion.h2>
          <div className="flex flex-wrap items-center gap-3 text-text/70 font-['NeueHaasGrotDisp'] text-sm">
            <span>By {article.author}</span>
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}