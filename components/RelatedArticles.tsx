"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/content";
import type { Article } from "@/lib/content";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mt-16 pt-12 border-t border-border"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-['Hefring_Slab_Bold'] text-text mb-8"
      >
        Related Articles
      </motion.h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {articles.map((article) => (
          <motion.article
            key={article.id}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Link href={article.href} className="block">
              <div className="h-64 bg-secondary rounded-2xl relative overflow-clip group">
                {article.image && (
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-0.5 text-xs font-['Hefring_Slab_Bold'] uppercase tracking-wider bg-primary text-background rounded-full mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-text font-bold text-lg font-['NeueHaasGrotDisp'] mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-text/70 font-['NeueHaasGrotDisp'] text-xs">
                    <span>By {article.author}</span>
                    <span>·</span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}