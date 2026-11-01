"use client";

import type { Article } from "@/lib/content";
import Image from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";

type ArticleProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleProps) {
  return (
    <Link href={article.href} className="block">
      <div className="h-80 w-full bg-secondary rounded-2xl relative overflow-clip text-left group">
        {/* Featured Image */}
        {article.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
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
  );
}