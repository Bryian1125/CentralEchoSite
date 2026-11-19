"use client";

import type { Article } from "@/lib/content";
import CarouselCard from "./CarouselCard";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Width of a single carousel card (matches CarouselCard's fixed width). */
const CARD_WIDTH = 720;
/** Gap between carousel cards (matches the gap-6 utility = 24px). */
const CARD_GAP = 24;
/** Auto-advance to the next featured article every 7 seconds. */
const AUTO_ADVANCE_MS = 7000;

export default function HeroBanner({ articles }: { articles: Article[] }) {
  // Only featured articles (sticky posts in the CMS) appear in the carousel.
  // Fall back to all articles if none are marked featured so it never empties.
  const featuredArticles = articles.filter((article) => article.featured);
  const displayArticles = featuredArticles.length > 0 ? featuredArticles : articles;

  const viewportRef = useRef<HTMLDivElement>(null);

  // scrollX is the translateX value of the carousel track (pixels).
  // Negative values shift the track left, making cards appear to move right (pan right).
  // Initialize to 0 on both server and client to avoid hydration mismatch.
  // The correct centered value is set in useEffect after hydration.
  const [scrollX, setScrollX] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Use a ref for the centered start position so it can be updated on resize
  // and read by the interval without stale closures.
  const initialXRef = useRef(0);

  // Set initial centered position after hydration to avoid SSR mismatch.
  useEffect(() => {
    setIsHydrated(true);
    const initial = (window.innerWidth - CARD_WIDTH) / 2;
    initialXRef.current = initial;
    setScrollX(initial);
  }, []);

  // Keep initialXRef in sync with viewport size on resize.
  useEffect(() => {
    const onResize = () => {
      const newInitial = (window.innerWidth - CARD_WIDTH) / 2;
      initialXRef.current = newInitial;
      // If scrollX has wrapped past the boundary, snap it back to the new start.
      if (Math.abs(scrollX - newInitial) > CARD_WIDTH + CARD_GAP) {
        setScrollX(newInitial);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scrollX]);

  // Auto-advance the carousel: decrease scrollX by one card width + gap each interval.
  // Wrap by resetting to initialXRef.current when past the last card.
  useEffect(() => {
    if (displayArticles.length <= 1) return undefined;
    const timer = setInterval(() => {
      setScrollX((prev) => {
        const newX = prev - (CARD_WIDTH + CARD_GAP); // more negative = pan right visually
        const maxScroll = -(displayArticles.length - 1) * (CARD_WIDTH + CARD_GAP);
        // If we've scrolled past the last card, reset to start so the next interval pans right again.
        return newX < maxScroll ? initialXRef.current : newX;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [displayArticles.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full min-h-screen bg-background"
    >
      {/* ARTWORK SECTION - takes ~90vh (accounting for browser chrome via svh) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative w-full flex-shrink-0"
        style={{ height: "100svh", minHeight: "700px" }}
      >
        <div className="absolute inset-0 m-4 sm:m-6 md:m-8 bg-[url('/assets/Kismet.png')] bg-cover bg-center rounded-2xl" />
        <div className="relative flex flex-col items-start justify-center w-full h-full px-4 sm:px-8 md:px-10 md:pl-20">
          <p className="text-2xl md:text-5xl font-['Hefring_Slab_Bold'] -mb-4">the</p>
          <p className="text-4xl md:text-9xl/24 font-['Hefring_Slab_Bold'] max-w-[800px]">central echo</p>
          <p className="text-sm md:text-xl text-justify font-['NeueHaasGrotDisp'] mt-6 max-w-[800px]">
            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD
            TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM
            VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX
            EA COMMODO CONSEQUAT. DUISM.
          </p>
        </div>
      </motion.div>

      {/* LATEST TODAY SECTION - constrained to 80% width (10% margins each side) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-row items-center justify-center w-full px-6 py-8"
      >
        <div className="w-full max-w-[80%] mx-auto flex flex-row items-center">
          <div className="flex flex-row items-center gap-2 border-2 border-text rounded-full px-4 py-1.5 shrink-0">
            <p className="text-xl font-['Hefring_Slab_Bold']">LATEST</p>
            <p className="text-xl font-['Hefring_Slab_Regular']">TODAY</p>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-text h-[2px]"
          />
        </div>
      </motion.div>

      {/* CAROUSEL SECTION */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
          },
        }}
        className="flex flex-col items-center w-full px-4 pb-16"
      >
        <div ref={viewportRef} className="w-full overflow-x-hidden pb-24">
          <motion.div
            className="flex flex-row gap-6 px-4"
            style={{ x: scrollX }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {displayArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}
                className="shrink-0"
              >
                <CarouselCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}