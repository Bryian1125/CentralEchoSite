import CategoryHeader from "../../../components/CategoryPage/CategoryHeader.tsx"
import SectionHeader from "../../../components/CategoryPage/SectionHeader.tsx"
import SpotlightArticle from "../../../components/CategoryPage/SpotlightArticle.tsx"
import Article from "../../../components/CategoryPage/Article.tsx"


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
            <div className = "grid grid-cols-3 items-center gap-7 h-auto w-4xl pb-10">
                <Article />
                <Article />
                <Article />
                <Article />
                <Article />
            </div>
        </div>
    )
}
