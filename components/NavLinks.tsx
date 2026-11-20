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

  const handleLinkClick = () => {
    onLinkClick?.();
  };

  const isActive = (href: string) => pathname === href;

  if (loading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="text-lg font-['Hefring_Slab_Bold']">Home</div>
        <div className="h-7 w-24 bg-text/10 rounded" />
        <div className="h-7 w-24 bg-text/10 rounded" />
        <div className="h-7 w-24 bg-text/10 rounded" />
        <div className="h-7 w-24 bg-text/10 rounded" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Home */}
      <Link
        href="/"
        onClick={onLinkClick}
        className={`text-lg text-text transition-colors hover:text-primary relative ${
          pathname === "/" ? "text-primary font-['Hefring_Slab_Bold']" : "font-['Hefring_Slab_Bold']"
        }`}
      >
        Home
      </Link>

      {/* Categories - always visible, no accordion */}
      <div>
        <h2 className="text-lg font-['Hefring_Slab_Bold'] text-text mb-2">CATEGORIES</h2>
        <ul className="flex flex-col gap-2 pl-4 mt-2">
          {categories.map((cat) => {
            const href = `/categories/${cat.slug}`;
            return (
              <li key={cat.slug}>
                <Link
                  href={href}
                  className={`text-lg text-text transition-colors hover:text-primary font-['Hefring_Slab_Regular'] ${
                    pathname === href ? "text-primary" : ""
                  }`}
                >
                  {cat.name.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}