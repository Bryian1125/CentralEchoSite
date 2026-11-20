"use client";

import type { Article } from "@/lib/content";
import NextImage from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";
import { motion } from "motion/react";

const MotionImage = motion(NextImage);

type ArticleProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleProps) {
  return (
    <Link href={article.href} className="block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", transition: { type: "spring", stiffness: 300, damping: 30 } }}
        className="h-80 w-full bg-secondary rounded-2xl relative overflow-clip text-left"
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
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col h-full justify-end p-4">
          <span className="inline-block w-fit px-2 py-0.5 text-xs font-['Hefring_Slab_Bold'] uppercase tracking-wider bg-primary text-background rounded-full mb-2">
            {article.category}
          </span>
          <motion.h3
            whileHover={{ x: 4, color: "var(--color-primary)" }}
            className="text-text font-bold text-lg font-['NeueHaasGrotDisp'] mb-1 transition-colors line-clamp-2"
          >
            {article.title}
          </motion.h3>
          <div className="flex flex-wrap items-center gap-2 text-text/70 font-['NeueHaasGrotDisp'] text-xs">
            <span>By {article.author}</span>
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}