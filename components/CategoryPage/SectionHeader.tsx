"use client";

import { motion } from "motion/react";

type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto h-32 flex items-center justify-center pt-10 gap-2 text-nowrap pb-10"
    >
      <h1 className="text-xl text-text font-['Hefring_Slab_Bold']">{title}</h1>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.645, 0.045, 0.355, 1] }}
        className="w-full h-1 bg-text"
      />
    </motion.div>
  );
}