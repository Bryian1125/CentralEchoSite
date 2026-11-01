/**
 * Content source used by the pages.
 *
 * Fetches from WordPress REST API via `lib/wordpress/api.ts`.
 * Falls back to mock data if WP is unavailable (development only).
 */

import type { Article } from "./content";
import type { WPCategory, ArticleWithContent } from "./wordpress/api";
import {
  getArticles,
  getArticlesByCategory as wpGetArticlesByCategory,
  getArticleBySlug as wpGetArticleBySlug,
  getArticleBySlugWithContent as wpGetArticleBySlugWithContent,
  getCategories as wpGetCategories,
  getRelatedArticles as wpGetRelatedArticles,
} from "./wordpress/api";
import { latestArticles, placeholderArticles } from "./mock/articles";

const USE_MOCK = process.env.NODE_ENV === "development" && !process.env.WORDPRESS_API_URL;

/** Mock categories for development. */
const mockCategories: WPCategory[] = [
  { id: 1, name: "Opinion", slug: "opinion", count: 5, link: "/opinion" },
  { id: 2, name: "Feature", slug: "feature", count: 5, link: "/feature" },
  { id: 3, name: "Literary", slug: "literary", count: 5, link: "/literary" },
  { id: 4, name: "Sports", slug: "sports", count: 5, link: "/sports" },
];

/** Latest articles for the hero carousel. */
export async function getLatestArticles(limit = 3): Promise<Article[]> {
  if (USE_MOCK) {
    return latestArticles.slice(0, limit);
  }
  try {
    return await getArticles({ perPage: limit });
  } catch (error) {
    console.warn("WordPress fetch failed, falling back to mock data:", error);
    return latestArticles.slice(0, limit);
  }
}

/** Articles for a category slug (used by home sections and category pages). */
export async function getArticlesByCategory(slug: string, limit = 6): Promise<Article[]> {
  if (USE_MOCK) {
    return placeholderArticles(limit, slug);
  }
  try {
    return await wpGetArticlesByCategory(slug, limit);
  } catch (error) {
    console.warn(`WordPress fetch failed for category ${slug}, falling back to mock data:`, error);
    return placeholderArticles(limit, slug);
  }
}

/** Fetch a single article by slug (for article detail page). */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (USE_MOCK) {
    return latestArticles.find((a) => a.slug === slug) ?? null;
  }
  try {
    return await wpGetArticleBySlug(slug);
  } catch (error) {
    console.warn(`WordPress fetch failed for article ${slug}:`, error);
    return latestArticles.find((a) => a.slug === slug) ?? null;
  }
}

/** Fetch all categories for navigation. */
export async function getCategories(): Promise<WPCategory[]> {
  if (USE_MOCK) {
    return mockCategories;
  }
  try {
    return await wpGetCategories();
  } catch (error) {
    console.warn("WordPress categories fetch failed, falling back to mock:", error);
    return mockCategories;
  }
}

/** Fetch a single article by slug with full content (for article detail page). */
export async function getArticleBySlugWithContent(slug: string): Promise<ArticleWithContent | null> {
  if (USE_MOCK) {
    const article = latestArticles.find((a) => a.slug === slug);
    return article ? { ...article, content: "<p>Mock article content.</p>" } : null;
  }
  try {
    return await wpGetArticleBySlugWithContent(slug);
  } catch (error) {
    console.warn(`WordPress fetch failed for article ${slug}:`, error);
    const article = latestArticles.find((a) => a.slug === slug);
    return article ? { ...article, content: "<p>Mock article content.</p>" } : null;
  }
}

/** Fetch articles for a category with pagination. */
export async function getArticlesByCategoryPaginated(
  slug: string,
  page = 1,
  limit = 6
): Promise<{ articles: Article[]; hasMore: boolean }> {
  if (USE_MOCK) {
    const all = placeholderArticles(limit * 3, slug); // Mock more articles
    const start = (page - 1) * limit;
    const articles = all.slice(start, start + limit);
    return { articles, hasMore: start + limit < all.length };
  }
  try {
    const articles = await getArticles({ categorySlug: slug, perPage: limit, page });
    return { articles, hasMore: articles.length === limit };
  } catch (error) {
    console.warn(`WordPress fetch failed for category ${slug}, falling back to mock data:`, error);
    const all = placeholderArticles(limit * 3, slug);
    const start = (page - 1) * limit;
    const articles = all.slice(start, start + limit);
    return { articles, hasMore: start + limit < all.length };
  }
}

/** Fetch related articles for an article (same category, excluding current). */
export async function getRelatedArticles(
  categorySlug: string,
  excludeId: number,
  limit = 3
): Promise<Article[]> {
  if (USE_MOCK) {
    return placeholderArticles(limit, categorySlug).filter((a) => a.id !== excludeId);
  }
  try {
    return await wpGetRelatedArticles(categorySlug, excludeId, limit);
  } catch (error) {
    console.warn(`WordPress fetch failed for related articles:`, error);
    return placeholderArticles(limit, categorySlug).filter((a) => a.id !== excludeId);
  }
}

/** Fetch all articles (for sitemap, RSS feed). */
export async function getAllArticles(limit = 100): Promise<Article[]> {
  if (USE_MOCK) {
    return latestArticles.slice(0, limit);
  }
  try {
    return await getArticles({ perPage: limit });
  } catch (error) {
    console.warn("WordPress fetch failed, falling back to mock data:", error);
    return latestArticles.slice(0, limit);
  }
}