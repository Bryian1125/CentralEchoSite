/**
 * Types for the WordPress REST API (wp-json/wp/v2).
 *
 * These mirror the raw payloads returned by a headless WordPress install.
 * Only the fields used by this site are typed; the API returns more.
 */

/** WordPress wraps most text fields in a `{ rendered }` object. */
export type WPRendered = {
    rendered: string;
    protected?: boolean;
};

export type WPUser = {
    id: number;
    name: string;
    slug: string;
    description: string;
    link: string;
    avatar_urls?: Record<string, string>;
};

export type WPTerm = {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
    description: string;
    link: string;
    count: number;
};

export type WPCategory = WPTerm & {
    parent: number;
};

export type WPMediaSize = {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
};

export type WPMedia = {
    id: number;
    date: string;
    slug: string;
    title: WPRendered;
    caption: WPRendered;
    alt_text: string;
    media_type: string;
    mime_type: string;
    source_url: string;
    media_details?: {
        width?: number;
        height?: number;
        file?: string;
        sizes?: Record<string, WPMediaSize>;
    };
};

export type WPPost = {
    id: number;
    date: string;
    slug: string;
    status: string;
    link: string;
    title: WPRendered;
    content: WPRendered;
    excerpt: WPRendered;
    author: number;
    featured_media: number;
    categories: number[];
    tags: number[];
    /** WordPress sticky post flag — used to mark an article as featured. */
    sticky?: boolean;
    _embedded?: WPPostEmbedded;
};

/** Present when the request uses `?_embed`. */
export type WPPostEmbedded = {
    author?: WPUser[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
};
