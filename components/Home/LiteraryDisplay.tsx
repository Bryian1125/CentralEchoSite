"use client";

import type { Article } from "@/lib/content";
import DisplayHeader from "./DisplayHeader";
import LiteraryDisplayCard from "./LiteraryDisplayCard";
import { motion } from "motion/react";

type Data = {
  link: string;
  articles: Article[];
};

export default function LiteraryDisplay({ link, articles }: Data) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center mt-10 mb-10 w-full"
    >
      <DisplayHeader title="LITERARY" link={link} />
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
        className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto justify-center items-stretch"
      >
        {articles.map((article) => (
          <motion.div key={article.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <LiteraryDisplayCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}