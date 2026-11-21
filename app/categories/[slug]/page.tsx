import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryHeader from "@/components/CategoryPage/CategoryHeader";
import SectionHeader from "@/components/CategoryPage/SectionHeader";
import SpotlightArticle from "@/components/CategoryPage/SpotlightArticle";
import Article from "@/components/CategoryPage/Article";
import EmptyCategory from "@/components/CategoryPage/EmptyCategory";
import { getArticlesByCategoryPaginated, getCategories, getFeaturedArticlesPaginated } from "@/lib/posts";
import Pagination from "@/components/Pagination";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.toUpperCase();
  
  return {
    title: `${categoryName} | The Central Echo`,
    description: `Browse all ${categoryName} articles from The Central Echo`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;

  // Validate the slug against the categories from the CMS so that mistyped
  // URLs (e.g. /categories/typo) return a 404 instead of an empty archive.
  const categories = await getCategories();
  if (!categories.some((category) => category.slug === slug)) {
    notFound();
  }

  const categoryName = slug.toUpperCase();
  const currentPage = Math.max(1, parseInt(page, 10));

  // Feature category only shows featured articles
  const { articles, hasMore } = slug === "feature"
    ? await getFeaturedArticlesPaginated(slug, currentPage, 6)
    : await getArticlesByCategoryPaginated(slug, currentPage, 6);
  
  // Show 404 for page > 1 with no articles, but friendly empty state for page 1
  if (articles.length === 0 && currentPage > 1) {
    notFound();
  }

  const [spotlight, ...moreArticles] = articles;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <div className="w-full max-w-6xl">
          <CategoryHeader title={categoryName} />
          
          {articles.length === 0 ? (
            // Empty state for page 1
            <EmptyCategory categoryName={categoryName} />
          ) : (
            <>
              <SectionHeader title="SPOTLIGHT ARTICLE" />
              {spotlight && <SpotlightArticle article={spotlight} />}
              {moreArticles.length > 0 && (
                <>
                  <SectionHeader title="MORE ARTICLES" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-4">
                    {moreArticles.map((article) => (
                      <Article key={article.id} article={article} />
                    ))}
                  </div>
                </>
              )}

              {hasMore && (
                <Pagination 
                  currentPage={currentPage} 
                  hasMore={hasMore} 
                  basePath={`/categories/${slug}`} 
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
