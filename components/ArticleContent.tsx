"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { formatDate } from "@/lib/content";
import type { ArticleWithContent } from "@/lib/wordpress/api";
import type { Article } from "@/lib/content";
import RelatedArticles from "./RelatedArticles";

interface ArticleContentProps {
  article: ArticleWithContent;
  relatedArticles?: Article[];
}

export default function ArticleContent({ article, relatedArticles = [] }: ArticleContentProps) {
  return (
    <article className="w-full max-w-3xl">
      {/* Category Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <span className="inline-block px-3 py-1 text-xs font-['Hefring_Slab_Bold'] uppercase tracking-wider bg-primary text-background rounded-full">
          {article.category}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="font-['Hefring_Slab_Bold'] text-4xl md:text-6xl leading-tight mb-6 text-text"
      >
        {article.title}
      </motion.h1>

      {/* Featured Image */}
      {article.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 relative aspect-video rounded-2xl overflow-hidden"
        >
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </motion.div>
      )}

      {/* Meta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-wrap items-center gap-4 mb-8 text-text/70 font-['NeueHaasGrotDisp'] text-sm"
      >
        <span>By {article.author}</span>
        <span>·</span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span>·</span>
        <span className="font-['Hefring_Slab_Bold'] uppercase tracking-wider">{article.category}</span>
      </motion.div>

      {/* Excerpt */}
      {article.excerpt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="prose prose-lg max-w-none mb-8 text-text/80 font-['NeueHaasGrotDisp'] border-b pb-8 border-border"
        >
          <p className="text-xl leading-relaxed">{article.excerpt}</p>
        </motion.div>
      )}

      {/* Full Content - WordPress returns HTML */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="prose prose-lg max-w-none font-['NeueHaasGrotDisp'] text-text"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />
    </article>
  );
}