"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
  link: string;
};

export default function NavLinks() {
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

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <Link href="/" className="text-lg font-['Hefring_Slab_Bold'] animate-pulse">Home</Link>
        <div className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <div className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <div className="h-7 w-24 bg-text/10 rounded animate-pulse" />
        <div className="h-7 w-24 bg-text/10 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-lg transition-colors hover:text-primary ${
            item.bold ? "font-['Hefring_Slab_Bold']" : "font-['Hefring_Slab_Regular']"
          } ${pathname === item.href ? "text-primary" : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}