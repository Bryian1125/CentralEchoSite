"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

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

  const navItems = [
    { href: "/", label: "Home", bold: true },
    ...categories.map((cat) => ({
      href: `/categories/${cat.slug}`,
      label: cat.name.toUpperCase(),
      bold: false,
    })),
  ];

  const handleLinkClick = () => {
    onLinkClick?.();
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
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="text-lg font-['Hefring_Slab_Bold'] animate-pulse">Home</motion.div>
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="h-7 w-24 bg-text/10 rounded animate-pulse" />
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
      {navItems.map((item) => (
        <motion.div
          key={item.href}
          variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
        >
          <Link
            href={item.href}
            onClick={handleLinkClick}
            className={`text-lg transition-colors hover:text-primary relative ${
              item.bold ? "font-['Hefring_Slab_Bold']" : "font-['Hefring_Slab_Regular']"
            } ${pathname === item.href ? "text-primary" : ""}`}
          >
            {item.label}
            {pathname === item.href && (
              <motion.div
                layoutId="active-indicator"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
              />
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}