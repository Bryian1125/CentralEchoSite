import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlugWithContent, getRelatedArticles } from "@/lib/posts";
import ArticleContent from "@/components/ArticleContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugWithContent(slug);
  
  if (!article) {
    return { title: "Article Not Found" };
  }
  
  return {
    title: `${article.title} | The Central Echo`,
    description: article.excerpt || `Read "${article.title}" on The Central Echo`,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.image ? [{ url: article.image, alt: article.imageAlt }] : [],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlugWithContent(slug);
  
  if (!article) {
    notFound();
  }

  // Fetch related articles from same category
  const categorySlug = article.category.toLowerCase();
  const relatedArticles = await getRelatedArticles(categorySlug, article.id, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <ArticleContent article={article} relatedArticles={relatedArticles} />
      </main>
    </div>
  );
}