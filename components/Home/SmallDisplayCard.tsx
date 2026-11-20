"use client";

import type { Article } from "@/lib/content";
import NextImage from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";
import { motion } from "motion/react";

const MotionImage = motion(NextImage);

export default function SmallDisplayCard({ article }: { article: Article }) {
  return (
    <Link href={article.href} className="block">
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col items-start justify-center w-[480px] h-[265px] rounded-4xl bg-background border-1 border-border shadow-xl relative overflow-clip text-left"
      >
        <div className="absolute inset-0">
          {article.image ? (
            <MotionImage
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="480px"
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
        </div>

        <div className="z-2 absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-6">
          <p className="text-text font-bold text-xl font-['NeueHaasGrotDisp'] line-clamp-2">
            {article.title}
          </p>
          <p className="text-text font-['Hefring_Slab_Bold'] text-base">by {article.author}</p>
          <p className="text-text font-['NeueHaasGrotDisp'] text-sm">{formatDate(article.date)}</p>
        </div>
      </motion.div>
    </Link>
  );
}