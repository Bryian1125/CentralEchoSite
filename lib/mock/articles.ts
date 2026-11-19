/**
 * Placeholder content used until a WordPress instance is connected.
 *
 * Shapes match the `Article` model, so swapping in real data only requires
 * changing `lib/posts.ts` to call the WordPress client.
 */

import type { Article } from "../content";

/** Carousel cards shown in the hero banner. */
export const latestArticles: Article[] = [
    {
        id: 1,
        slug: "road-rules-vs-youthful-drive",
        title: "Road Rules vs. Youthful Drive: A Diversion Road Reality Check",
        excerpt: "",
        author: "Author Name",
        date: "2026-08-11T00:00:00",
        category: "OPINION",
        featured: true,
        href: "/articles/road-rules-vs-youthful-drive",
        image: null,
        imageAlt: "Road Rules vs. Youthful Drive",
    },
    {
        id: 2,
        slug: "road-rules-vs-youthful-drive-2",
        title: "Road Rules vs. Youthful Drive: A Diversion Road Reality Check",
        excerpt: "",
        author: "Author Name",
        date: "2026-08-11T00:00:00",
        category: "OPINION",
        featured: true,
        href: "/articles/road-rules-vs-youthful-drive-2",
        image: null,
        imageAlt: "Road Rules vs. Youthful Drive",
    },
    {
        id: 3,
        slug: "road-rules-vs-youthful-drive-3",
        title: "Road Rules vs. Youthful Drive: A Diversion Road Reality Check",
        excerpt: "",
        author: "Author Name",
        date: "2026-08-11T00:00:00",
        category: "OPINION",
        featured: true,
        href: "/articles/road-rules-vs-youthful-drive-3",
        image: null,
        imageAlt: "Road Rules vs. Youthful Drive",
    },
];

/** Generate placeholder articles for a category. */
export function placeholderArticles(count: number, category: string): Article[] {
    const label = category.toUpperCase();
    return Array.from({ length: count }, (_, index) => {
        const slug = `${category}-article-${index + 1}`;
        return {
            id: 100 + index,
            slug,
            title: "Article Title",
            excerpt: "",
            author: "Author Name",
            date: "2026-01-01T00:00:00",
            category: label,
            featured: false,
            href: `/articles/${slug}`,
            image: null,
            imageAlt: "Article image",
        };
    });
}
