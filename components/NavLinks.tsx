"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
  link: string;
};

interface NavLinksProps {
  onLinkClick?: () => void;
}

export default function NavLinks({ onLinkClick }: NavLinksProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.warn("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleLinkClick = () => {
    onLinkClick?.();
  };

  const isActive = (href: string) => pathname === href;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (loading) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-col gap-3"
      >
        <motion.div variants={itemVariants} className="text-lg font-['Hefring_Slab_Bold'] animate-pulse">Home</motion.div>
        <motion.div variants={itemVariants} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <motion.div variants={itemVariants} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <motion.div variants={itemVariants} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <motion.div variants={itemVariants} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      className="flex flex-col gap-3"
    >
      {/* Home */}
      <motion.div variants={itemVariants}>
        <Link
          href="/"
          onClick={handleLinkClick}
          className={`text-lg transition-colors hover:text-primary relative ${
            isActive("/") ? "text-primary font-['Hefring_Slab_Bold']" : "font-['Hefring_Slab_Bold']"
          }`}
        >
          Home
          {isActive("/") && (
            <motion.div
              layoutId="active-indicator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
            />
          )}
        </Link>
      </motion.div>

      {/* Categories accordion */}
      <motion.div variants={itemVariants} className="flex flex-col">
        <button
          type="button"
          onClick={() => setCategoriesOpen((open) => !open)}
          aria-expanded={categoriesOpen}
          aria-controls="nav-categories-panel"
          className="w-full flex items-center justify-between text-lg font-['Hefring_Slab_Bold'] text-text hover:text-primary transition-colors"
        >
          CATEGORIES
          <motion.svg
            animate={{ rotate: categoriesOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </button>

        <AnimatePresence initial={false}>
          {categoriesOpen && (
            <motion.ul
              id="nav-categories-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden flex flex-col gap-2 pl-4 mt-2"
            >
              {categories.map((cat) => {
                const href = `/categories/${cat.slug}`;
                return (
                  <motion.li key={cat.slug} variants={itemVariants}>
                    <Link
                      href={href}
                      onClick={handleLinkClick}
                      className={`text-lg transition-colors hover:text-primary relative font-['Hefring_Slab_Regular'] ${
                        isActive(href) ? "text-primary" : ""
                      }`}
                    >
                      {cat.name.toUpperCase()}
                      {isActive(href) && (
                        <motion.div
                          layoutId="active-indicator"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}