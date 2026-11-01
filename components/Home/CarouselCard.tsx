"use client";

import type { Article } from "@/lib/content";
import Image from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";

export default function CarouselCard({ article }: { article: Article }) {
  return (
    <Link href={article.href} className="block">
      <div className="w-[720px] h-[480px] aspect-video bg-background rounded-4xl relative overflow-clip border-1 border-border shadow-xl group">
        <div className="absolute inset-0">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="720px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
        </div>

        <div className="z-2 absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-6">
          <p className="text-text font-bold uppercase text-sm font-['Hefring_Slab_Bold']">
            {article.category} • <span className="font-['NeueHaasGrotDisp']">{formatDate(article.date)}</span>
          </p>
          <p className="text-3xl font-bold text-text mt-2 font-['NeueHaasGrotDisp'] w-lg">
            {article.title}
          </p>
          <div className="flex flex-row items-end justify-between mt-4">
            <p className="text-text font-['Hefring_Slab_Bold']">
              by {article.author}
            </p>

            <div className="flex flex-row items-center justify-center gap-2">
              <h1 className="text-2xl text-text font-['Hefring_Slab_Medium']">
                READ MORE
              </h1>
              <Image
                src="/assets/up-right-arrow.png"
                alt=""
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}