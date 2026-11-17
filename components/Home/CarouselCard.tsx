"use client";

import type { Article } from "@/lib/content";
import NextImage from "next/image";
import { formatDate } from "@/lib/content";
import Link from "next/link";
import { motion } from "motion/react";

const MotionImage = motion(NextImage);

export default function CarouselCard({ article }: { article: Article }) {
  return (
    <Link href={article.href} className="block">
      <motion.div
        whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-[720px] h-[480px] bg-background rounded-4xl relative overflow-clip border-1 border-border shadow-xl"
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

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex flex-row items-center justify-center gap-2"
            >
              <h1 className="text-2xl text-text font-['Hefring_Slab_Medium']">
                READ MORE
              </h1>
              <NextImage
                src="/assets/up-right-arrow.png"
                alt=""
                width={16}
                height={16}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}