"use client";

import type { Article } from "@/lib/content";
import CarouselCard from "./CarouselCard";
import { motion } from "motion/react";

export default function HeroBanner({ articles }: { articles: Article[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center w-full h-auto min-h-[400px] md:h-360 bg-background pt-7 gap-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full h-full px-4 sm:px-8 md:px-6"
      >
        <div className="flex flex-row items-center justify-start w-full h-full min-h-[200px] md:h-full bg-[url('/assets/Kismet.png')] pl-4 pr-4 md:pl-10 md:pr-10 rounded-2xl bg-cover">
          <div className="flex flex-col items-center justify-center w-full md:w-200 h-full">
            <p className="text-2xl md:text-5xl font-['Hefring_Slab_Bold'] -mb-7 mr-70">the</p>
            <p className="text-4xl md:text-9xl/24 font-['Hefring_Slab_Bold'] w-full md:w-120">central echo</p>
            <p className="text-sm md:text-xl text-justify font-['NeueHaasGrotDisp'] mt-4 md:mt-10 w-full md:w-120">
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD
              TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM
              VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX
              EA COMMODO CONSEQUAT. DUISM.
            </p>
          </div>
        </div>
      </motion.div>

      {/*CAROUSEL*/}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-row items-center justify-center mt-10"
      >
        <div className="flex flex-row items-center justify-center border-2 border-text rounded-full w-[200px] h-[50px] gap-2">
          <p className="text-xl font-['Hefring_Slab_Bold']">LATEST</p>
          <p className="text-xl font-['Hefring_Slab_Regular']">TODAY</p>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-text w-32 md:w-256 h-[2px]"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="flex flex-row items-center justify-center w-full h-auto md:h-[520px] mt-10 mb-10 gap-4 md:gap-12 overflow-x-auto md:overflow-x-clip"
      >
        {articles.map((article) => (
          <motion.div key={article.id} variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <CarouselCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}