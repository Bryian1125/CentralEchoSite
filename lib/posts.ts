/**
 * Content source used by the pages.
 *
 * Currently returns placeholder data from `lib/mock/articles.ts` so the site
 * renders without a CMS. To go live with WordPress, replace the bodies with
 * the client calls (already implemented in `lib/wordpress/api.ts`):
 *
 *   return getArticles({ perPage: limit });
 *   return getArticlesByCategory(slug, limit);
 */

import type { Article } from "./content";
import { latestArticles, placeholderArticles } from "./mock/articles";

/** Latest articles for the hero carousel. */
export async function getLatestArticles(limit = 3): Promise<Article[]> {
    return latestArticles.slice(0, limit);
}

/** Articles for a category slug (used by home sections and category pages). */
export async function getArticlesByCategory(slug: string, limit = 6): Promise<Article[]> {
    return placeholderArticles(limit, slug);
}
