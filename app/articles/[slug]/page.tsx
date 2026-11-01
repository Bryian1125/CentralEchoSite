import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlugWithContent } from "@/lib/posts";
import { formatDate } from "@/lib/content";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <article className="w-full max-w-3xl">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-['Hefring_Slab_Bold'] uppercase tracking-wider bg-primary text-background rounded-full">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Hefring_Slab_Bold'] text-4xl md:text-6xl leading-tight mb-6 text-text">
            {article.title}
          </h1>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-8 relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-text/70 font-['NeueHaasGrotDisp'] text-sm">
            <span>By {article.author}</span>
            <span>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>·</span>
            <span className="font-['Hefring_Slab_Bold'] uppercase tracking-wider">{article.category}</span>
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <div className="prose prose-lg max-w-none mb-8 text-text/80 font-['NeueHaasGrotDisp'] border-b pb-8 border-border">
              <p className="text-xl leading-relaxed">{article.excerpt}</p>
            </div>
          )}

          {/* Full Content - WordPress returns HTML */}
          <div 
            className="prose prose-lg max-w-none font-['NeueHaasGrotDisp'] text-text"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </main>
    </div>
  );
}