import { NextResponse } from "next/server";

const API_URL = (process.env.WORDPRESS_API_URL ?? "").replace(/\/+$/, "");

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return NextResponse.json([]);
  }

  if (!API_URL) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `${API_URL}/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=10&_embed=true`,
      {
        next: { revalidate: 60 },
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) {
      return NextResponse.json([]);
    }

    const posts = await response.json();

    const results = posts.map((post: any) => ({
      id: post.id,
      title: post.title?.rendered?.replace(/<[^>]*>/g, "") ?? "Untitled",
      excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, "").substring(0, 160) ?? "",
      slug: post.slug,
      href: `/articles/${post.slug}`,
      category: post._embedded?.["wp:term"]?.[0]?.find((t: any) => t.taxonomy === "category")?.name ?? "",
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url ?? null,
    }));

    return NextResponse.json(results);
  } catch {
    return NextResponse.json([]);
  }
}