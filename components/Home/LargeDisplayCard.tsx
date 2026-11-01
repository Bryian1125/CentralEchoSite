"use client";

import type { Article } from "@/lib/content";
import Image from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";

export default function LargeDisplayCard({ article }: { article: Article }) {
  return (
    <Link href={article.href} className="block">
      <div className="flex flex-col items-start justify-center w-[550px] h-[550px] rounded-4xl bg-background border-1 border-border shadow-xl relative overflow-clip text-left group">
        <div className="absolute inset-0">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="550px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
        </div>

        <div className="z-2 absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-6">
          <p className="text-text font-bold text-2xl font-['NeueHaasGrotDisp'] group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </p>
          <p className="text-text font-['Hefring_Slab_Bold']">by {article.author}</p>
          <p className="text-text font-['NeueHaasGrotDisp'] text-sm">{formatDate(article.date)}</p>
        </div>
      </div>
    </Link>
  );
}