type SpotlightArticleProps = {
    title?: string;
    author?: string;
    date?: string;
}

export default function SpotlightArticle({ title = "Spotlight Article", author = "Author Name", date = "January 1, 2026" }: SpotlightArticleProps) {
    return (
        <button className="w-4xl h-90 bg-secondary rounded-2xl relative overflow-clip text-left">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-6">
                <p className="text-text font-bold text-2xl font-['NeueHaasGrotDisp']">{title}</p>
                <p className="text-text font-['Hefring_Slab_Bold']">by {author}</p>
                <p className="text-text font-['NeueHaasGrotDisp'] text-sm">{date}</p>
            </div>
        </button>
    )
}
