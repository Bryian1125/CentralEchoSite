import { Metadata } from "next";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import CategoryHeader from "@/components/CategoryPage/CategoryHeader";
import SectionHeader from "@/components/CategoryPage/SectionHeader";
import SpotlightArticle from "@/components/CategoryPage/SpotlightArticle";
import Article from "@/components/CategoryPage/Article";
import { getArticlesByCategoryPaginated } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import Link from "next/link";

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
  const categoryName = slug.toUpperCase();
  const currentPage = Math.max(1, parseInt(page, 10));
  
  const { articles, hasMore } = await getArticlesByCategoryPaginated(slug, currentPage, 6);
  
  // Show 404 for page > 1 with no articles, but friendly empty state for page 1
  if (articles.length === 0 && currentPage > 1) {
    notFound();
  }

  const [spotlight, ...moreArticles] = articles;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <div className="w-full max-w-6xl">
          <CategoryHeader title={categoryName} />
          
          {articles.length === 0 ? (
            // Empty state for page 1
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-text/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-['Hefring_Slab_Bold'] text-text mb-2">
                No articles yet
              </h2>
              <p className="text-text/60 font-['NeueHaasGrotDisp'] mb-8 max-w-md mx-auto">
                There are no articles in the {categoryName} category yet. Check back soon!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-['Hefring_Slab_Bold'] rounded-full hover:opacity-90 transition-opacity"
              >
                ← Back to Home
              </Link>
            </motion.div>
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