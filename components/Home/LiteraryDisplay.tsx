import type { Article } from "../../lib/content"
import DisplayHeader from "./DisplayHeader"
import LiteraryDisplayCard from "./LiteraryDisplayCard"

type Data = {
    link: string
    articles: Article[]
}

export default function LiteraryDisplay({link, articles}: Data) {
    return(
        <div className = "flex flex-col items-center justify-center mt-10 mb-10">
            <DisplayHeader
                title = "LITERARY"
                link = {link}
            />
            <div className = "flex flex-col md:flex-row gap-3 w-full h-auto md:h-[450] justify-center items-center md:items-align">
                {articles.map((article) => (
                    <LiteraryDisplayCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    )
}
