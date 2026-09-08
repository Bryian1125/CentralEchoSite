import CategoryHeader from "../../../components/CategoryPage/CategoryHeader.tsx"
import SectionHeader from "../../../components/CategoryPage/SectionHeader.tsx"
import SpotlightArticle from "../../../components/CategoryPage/SpotlightArticle.tsx"

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return(
        <div className = "flex flex-col items-center justify-center">
        <CategoryHeader
            title = {slug.toUpperCase()}
        />
        <SectionHeader
            title = "SPOTLIGHT ARTICLE"
        />
        <SpotlightArticle
        />
        <SectionHeader
            title = "MORE ARTICLES"
        />
        </div>
    )
} 
