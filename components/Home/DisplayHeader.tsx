"use client";

import Link from "next/link";
import { motion } from "motion/react";

type HeaderData = {
  title: string;
  link: string;
};

export default function DisplayHeader({ title, link }: HeaderData) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full h-auto items-center justify-end mt-24 mb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-row items-center justify-between w-full max-w-[1200px] mx-auto"
      >
        <h1 className="text-text text-4xl font-['Hefring_Slab_Bold']">{title}</h1>
        <Link
          href={`/categories/${link}`}
          className="flex flex-row items-center justify-center gap-2 text-text font-['Hefring_Slab_Medium'] text-2xl hover:text-primary transition-colors"
        >
          <motion.span
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-row items-center justify-center gap-2"
          >
            <span>SEE ALL</span>
            <motion.img
              whileHover={{ x: 4 }}
              src="/assets/up-right-arrow.png"
              alt=""
              width={16}
              height={16}
            />
          </motion.span>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, scaleY: 0 }}
        whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-text w-full max-w-[1200px] mx-auto h-[2px] mt-4"
      />
    </motion.div>
  );
}