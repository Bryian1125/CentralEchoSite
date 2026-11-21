/**
 * Headless WordPress client.
 *
 * Reads the REST API base URL from the `WORDPRESS_API_URL` environment
 * variable (e.g. https://cms.example.com) and maps posts into the app's
 * `Article` model.
 */

import type { Article } from "../content";
import type { WPMedia, WPPost } from "./types";

const API_URL = (process.env.WORDPRESS_API_URL ?? "").replace(/\/+$/, "");

const ENTITIES: Record<string, string> = {
    "&": "&",
    "<": "<",
    ">": ">",
    "&#039;": "'",
    "&#8217;": "\u2019",
    "&#8216;": "\u2018",
    "&#8220;": "\u201C",
    "&#8221;": "\u201D",
    "&nbsp;": " ",
};

/** Strip HTML tags and decode common entities from a rendered CMS string. */
export function decodeHtml(html = ""): string {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&[#a-zA-Z0-9]+;/g, (entity) => ENTITIES[entity] ?? entity)
        .trim();
}

/** Resolve a post's featured image URL, preferring the requested size. */
export function getFeaturedImage(post: WPPost, size = "large"): string | null {
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    if (!media) {
        return null;
    }
    return media.media_details?.sizes?.[size]?.source_url ?? media.source_url ?? null;
}

function getFeaturedMedia(post: WPPost): WPMedia | null {
    return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

/** Map a raw WordPress post into the app's `Article` model. */
export function mapPostToArticle(post: WPPost): Article {
    const media = getFeaturedMedia(post);
    const author = post._embedded?.author?.[0]?.name ?? "Staff";
    const title = decodeHtml(post.title?.rendered);
    const category = post._embedded?.["wp:term"]
        ?.flat()
        .find((term) => term.taxonomy === "category");

    // Normalize category name to uppercase for consistent display/comparison
    const categoryName = category?.name?.toUpperCase() ?? "";

    return {
        id: post.id,
        slug: post.slug,
        title,
        excerpt: decodeHtml(post.excerpt?.rendered),
        author,
        date: post.date,
        category: categoryName,
        href: `/articles/${post.slug}`,
        featured: post.sticky ?? false,
        image: getFeaturedImage(post),
        imageAlt: media?.alt_text || title,
    };
}

/** Extended article with full content for detail page. */
export type ArticleWithContent = Article & {
  content: string;
};

/** Map a raw WordPress post into the app's `ArticleWithContent` model. */
export function mapPostToArticleWithContent(post: WPPost): ArticleWithContent {
  const article = mapPostToArticle(post);
  return {
    ...article,
    content: post.content?.rendered ?? "",
  };
}

/** WordPress Category type for navigation. */
export type WPCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
  link: string;
};

/** In-memory cache for category slug -> ID mapping. */
let categorySlugToIdCache: Map<string, number> | null = null;
let categoryCacheTimestamp = 0;
const CATEGORY_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/** Build category slug -> ID mapping. */
async function buildCategorySlugMap(): Promise<Map<string, number>> {
  const now = Date.now();
  if (categorySlugToIdCache && now - categoryCacheTimestamp < CATEGORY_CACHE_TTL) {
    return categorySlugToIdCache;
  }

  const categories = await getCategories();
  const map = new Map<string, number>();
  for (const cat of categories) {
    map.set(cat.slug.toLowerCase(), cat.id);
  }
  categorySlugToIdCache = map;
  categoryCacheTimestamp = now;
  return map;
}

/** Get category ID from slug. */
async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  const map = await buildCategorySlugMap();
  return map.get(slug.toLowerCase()) ?? null;
}

export type FetchPostsOptions = {
    /** Maximum number of posts to return. */
    perPage?: number;
    /** Filter by category slug (resolved to category ID). */
    categorySlug?: string;
    /** Filter by category ID directly. */
    categoryId?: number;
    /** Fetch a single post by slug. */
    slug?: string;
    /** Page number for pagination (1-indexed). */
    page?: number;
    /** Post IDs to exclude from results. */
    exclude?: number[];
};

/** Fetch raw posts from the WordPress REST API. Requires `WORDPRESS_API_URL`. */
export async function fetchPosts(options: FetchPostsOptions = {}): Promise<WPPost[]> {
    if (!API_URL) {
        throw new Error(
            "WORDPRESS_API_URL is not set. Add it to your environment to fetch content from the CMS.",
        );
    }

    const query = new URLSearchParams({ _embed: "true" });
    if (options.perPage) {
        query.set("per_page", String(options.perPage));
    }
    // Prefer categoryId if provided, otherwise resolve categorySlug to ID
    if (options.categoryId) {
        query.set("categories", String(options.categoryId));
    } else if (options.categorySlug) {
        const categoryId = await getCategoryIdBySlug(options.categorySlug);
        if (categoryId) {
            query.set("categories", String(categoryId));
        }
        // If categoryId not found, don't add filter (will return all posts)
    }
    if (options.slug) {
        query.set("slug", options.slug);
    }
    if (options.page) {
        query.set("page", String(options.page));
    }
    if (options.exclude && options.exclude.length > 0) {
        query.set("exclude", options.exclude.join(","));
    }

    const response = await fetch(`${API_URL}/posts?${query}`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`WordPress request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as WPPost[];
}

/** Fetch posts and map them into `Article`s. */
export async function getArticles(options: FetchPostsOptions = {}): Promise<Article[]> {
    const posts = await fetchPosts(options);
    return posts.map(mapPostToArticle);
}

/** Fetch a single article by slug. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const [post] = await fetchPosts({ slug, perPage: 1 });
    return post ? mapPostToArticle(post) : null;
}

/** Fetch the latest articles within a category slug. */
export async function getArticlesByCategory(categorySlug: string, perPage = 6): Promise<Article[]> {
    return getArticles({ categorySlug, perPage });
}

/** Fetch a single article by slug with full content for detail page. */
export async function getArticleBySlugWithContent(slug: string): Promise<ArticleWithContent | null> {
  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not set.");
  }

  const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed=true`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${response.statusText}`);
  }

  const posts = (await response.json()) as WPPost[];
  const post = posts[0];
  
  return post ? mapPostToArticleWithContent(post) : null;
}

/** Fetch all categories from WordPress for navigation. */
export async function getCategories(): Promise<WPCategory[]> {
  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not set.");
  }

  const response = await fetch(`${API_URL}/categories?per_page=100`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`WordPress categories request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as WPCategory[];
}

/** Fetch related articles (same category, excluding current article). */
export async function getRelatedArticles(
  categorySlug: string,
  excludeId: number,
  limit = 3
): Promise<Article[]> {
  return getArticles({ categorySlug, perPage: limit, exclude: [excludeId] });
}