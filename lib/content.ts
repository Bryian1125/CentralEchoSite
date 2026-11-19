/**
 * App-facing content model.
 *
 * WordPress payloads (`lib/wordpress/types.ts`) are mapped into this shape
 * before they reach the UI, so presentation components never depend on the
 * raw CMS response. See `lib/wordpress/api.ts`.
 */

export type Article = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    /** ISO 8601 date, as returned by the CMS. Format with `formatDate`. */
    date: string;
    /** Human-readable category label, e.g. "OPINION". */
    category: string;
    /** Intended in-app link to the article detail route. */
    href: string;
    /** Whether the article is featured in the hero carousel (set via the CMS). */
    featured: boolean;
    image: string | null;
    imageAlt: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

/** Format an ISO date string for display, e.g. "August 11, 2026". */
export function formatDate(iso: string): string {
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? iso : dateFormatter.format(parsed);
}
