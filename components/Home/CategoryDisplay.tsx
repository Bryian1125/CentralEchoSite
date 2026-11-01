"use client";

import type { Article } from "@/lib/content";
import DisplayHeader from "./DisplayHeader";
import SmallDisplayCard from "./SmallDisplayCard";
import LargeDisplayCard from "./LargeDisplayCard";
import { motion } from "motion/react";

type CategoryDisplayProps = {
  title: string;
  link: string;
  articles: Article[];
};

export default function CategoryDisplay({ title, link, articles }: CategoryDisplayProps) {
  const [first, second, third] = articles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center mt-10 mb-10 w-full"
    >
      <DisplayHeader title={title} link={link} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="flex flex-col md:flex-row gap-6 w-full max-w-[1200px] mx-auto justify-center"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-6">
          {first && <SmallDisplayCard article={first} />}
          {second && <SmallDisplayCard article={second} />}
        </motion.div>
        {third && (
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <LargeDisplayCard article={third} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}