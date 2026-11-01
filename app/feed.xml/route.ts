import { getAllArticles } from "@/lib/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET() {
  const articles = await getAllArticles(50);

  const rssItems = articles
    .map((article) => {
      const pubDate = new Date(article.date).toUTCString();
      return `
        <item>
          <title><![CDATA[${article.title}]]></title>
          <link>${BASE_URL}${article.href}</link>
          <guid isPermaLink="true">${BASE_URL}${article.href}</guid>
          <description><![CDATA[${article.excerpt || article.title}]]></description>
          <pubDate>${pubDate}</pubDate>
          <category>${article.category}</category>
          ${article.image ? `<enclosure url="${article.image}" type="image/jpeg" />` : ""}
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Central Echo</title>
    <link>${BASE_URL}</link>
    <description>The official student publication of Central Philippine University</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}