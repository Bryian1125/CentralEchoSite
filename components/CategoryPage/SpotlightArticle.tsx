"use client";

import type { Article } from "@/lib/content";
import Image from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";

type SpotlightArticleProps = {
  article: Article;
};

export default function SpotlightArticle({ article }: SpotlightArticleProps) {
  return (
    <Link href={article.href} className="block">
      <div className="w-full max-w-4xl h-90 bg-secondary rounded-2xl relative overflow-clip text-left group">
        {/* Featured Image */}
        {article.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
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
          <h2 className="text-text font-bold text-2xl md:text-3xl font-['NeueHaasGrotDisp'] mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-text/70 font-['NeueHaasGrotDisp'] text-sm">
            <span>By {article.author}</span>
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
        </div>
      </div>
    </Link>
  );
}