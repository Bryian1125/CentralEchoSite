import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryHeader from "@/components/CategoryPage/CategoryHeader";
import SectionHeader from "@/components/CategoryPage/SectionHeader";
import SpotlightArticle from "@/components/CategoryPage/SpotlightArticle";
import Article from "@/components/CategoryPage/Article";
import { getArticlesByCategory } from "@/lib/posts";
import Navbar from "@/components/Navbar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.toUpperCase();
  
  return {
    title: `${categoryName} | The Central Echo`,
    description: `Browse all ${categoryName} articles from The Central Echo`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryName = slug.toUpperCase();
  
  const articles = await getArticlesByCategory(slug, 6);
  
  if (articles.length === 0) {
    notFound();
  }

  const [spotlight, ...moreArticles] = articles;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <div className="w-full max-w-6xl">
          <CategoryHeader title={categoryName} />
          
          <SectionHeader title="SPOTLIGHT ARTICLE" />
          {spotlight && <SpotlightArticle article={spotlight} />}
          
          <SectionHeader title="MORE ARTICLES" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-4">
            {moreArticles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}