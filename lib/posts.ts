/**
 * Content source used by the pages.
 *
 * Fetches from WordPress REST API via `lib/wordpress/api.ts`.
 * No mock fallback - requires WORDPRESS_API_URL to be set.
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

/** Latest articles for the hero carousel (5 most recent, any category). */
export async function getLatestArticles(limit = 5): Promise<Article[]> {
  return await getArticles({ perPage: limit });
}

/** Featured articles from a category (for home page Feature display) - returns all posts in that category. */
export async function getFeaturedArticles(categorySlug: string, limit = 3): Promise<Article[]> {
  // Fetch category articles (no sticky filter - shows all posts in the Feature category)
  return await wpGetArticlesByCategory(categorySlug, limit);
}

/** Articles for a category slug (used by home sections and category pages). */
export async function getArticlesByCategory(slug: string, limit = 6): Promise<Article[]> {
  return await wpGetArticlesByCategory(slug, limit);
}

/** Fetch a single article by slug (for article detail page). */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return await wpGetArticleBySlug(slug);
}

/** Fetch all categories for navigation. */
export async function getCategories(): Promise<WPCategory[]> {
  return await wpGetCategories();
}

/** Fetch a single article by slug with full content (for article detail page). */
export async function getArticleBySlugWithContent(slug: string): Promise<ArticleWithContent | null> {
  return await wpGetArticleBySlugWithContent(slug);
}

/** Fetch articles for a category with pagination. */
export async function getArticlesByCategoryPaginated(
  slug: string,
  page = 1,
  limit = 6
): Promise<{ articles: Article[]; hasMore: boolean }> {
  const articles = await getArticles({ categorySlug: slug, perPage: limit, page });
  return { articles, hasMore: articles.length === limit };
}

/** Fetch featured articles from a category with pagination (for category archive) - returns all posts in that category. */
export async function getFeaturedArticlesPaginated(
  categorySlug: string,
  page = 1,
  limit = 6
): Promise<{ articles: Article[]; hasMore: boolean }> {
  // Fetch category articles with pagination (no sticky filter)
  const articles = await getArticles({ categorySlug, perPage: limit, page });
  return { articles, hasMore: articles.length === limit };
}

/** Fetch related articles for an article (same category, excluding current). */
export async function getRelatedArticles(
  categorySlug: string,
  excludeId: number,
  limit = 3
): Promise<Article[]> {
  return await wpGetRelatedArticles(categorySlug, excludeId, limit);
}

/** Fetch all articles (for sitemap, RSS feed). */
export async function getAllArticles(limit = 100): Promise<Article[]> {
  return await getArticles({ perPage: limit });
}