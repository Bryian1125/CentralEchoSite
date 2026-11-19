"use client";

import { motion } from "motion/react";

type Data = {
  title: string;
};

export default function CategoryHeader({ title }: Data) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full max-w-6xl mx-auto py-12 text-center"
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.55, 0.055, 0.675, 0.19] }}
        className="inline-flex px-3 py-1 text-xs font-['Hefring_Slab_Bold'] uppercase tracking-wider bg-primary text-background rounded-full mb-4 shrink-0 mx-auto"
        style={{ width: "fit-content" }}
      >
        CATEGORY ARCHIVES
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.55, 0.055, 0.675, 0.19] }}
        className="text-4xl md:text-6xl lg:text-7xl font-['Hefring_Slab_Bold'] text-text leading-tight"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "80px" }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.55, 0.055, 0.675, 0.19] }}
        className="mx-auto mt-4 h-1 bg-primary"
      />
    </motion.div>
  );
}