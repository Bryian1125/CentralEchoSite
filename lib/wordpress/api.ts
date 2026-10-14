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
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
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

    return {
        id: post.id,
        slug: post.slug,
        title,
        excerpt: decodeHtml(post.excerpt?.rendered),
        author,
        date: post.date,
        category: category?.name ?? "",
        href: `/articles/${post.slug}`,
        image: getFeaturedImage(post),
        imageAlt: media?.alt_text || title,
    };
}

export type FetchPostsOptions = {
    /** Maximum number of posts to return. */
    perPage?: number;
    /** Filter by category slug (WordPress `category_name`). */
    categorySlug?: string;
    /** Fetch a single post by slug. */
    slug?: string;
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
    if (options.categorySlug) {
        query.set("category_name", options.categorySlug);
    }
    if (options.slug) {
        query.set("slug", options.slug);
    }

    const response = await fetch(`${API_URL}/wp-json/wp/v2/posts?${query}`, {
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
