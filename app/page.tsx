import HeroBanner from "../components/Home/HeroBanner"
import CategoryDisplay from "../components/Home/CategoryDisplay"
import LiteraryDisplay from "../components/Home/LiteraryDisplay"
import { getLatestArticles, getArticlesByCategory, getFeaturedArticles } from "@/lib/posts"

const CATEGORY_SLUGS = {
  OPINION: "opinion",
  FEATURE: "feature",
  LITERARY: "literary",
  SPORTS: "sports",
} as const;

export default async function App() {
  // Fetch all data in parallel
  const [latestArticles, opinionArticles, featureArticles, literaryArticles, sportsArticles] = await Promise.all([
    getLatestArticles(5), // 5 most recent for carousel
    getArticlesByCategory(CATEGORY_SLUGS.OPINION, 3),
    getFeaturedArticles(CATEGORY_SLUGS.FEATURE, 3), // Only featured articles for Feature category
    getArticlesByCategory(CATEGORY_SLUGS.LITERARY, 6),
    getArticlesByCategory(CATEGORY_SLUGS.SPORTS, 3),
  ]);

  return (
    <div>
      <HeroBanner articles={latestArticles} />
      <CategoryDisplay title="OPINION" link="opinion" articles={opinionArticles} />
      <CategoryDisplay title="FEATURE" link="feature" articles={featureArticles} />
      <LiteraryDisplay link="literary" articles={literaryArticles} />
      <CategoryDisplay title="SPORTS" link="sports" articles={sportsArticles} />
    </div>
  );
}