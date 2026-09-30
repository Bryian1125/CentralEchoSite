type ArticleProps = {
    title?: string;
    author?: string;
    date?: string;
}

export default function Article({ title = "Article Title", author = "Author Name", date = "January 1, 2026" }: ArticleProps) {
    return (
        <button className="flex flex-col h-80 w-full bg-secondary rounded-2xl relative overflow-clip text-left">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-4">
                <p className="text-text font-bold text-lg font-['NeueHaasGrotDisp']">{title}</p>
                <p className="text-text font-['Hefring_Slab_Bold'] text-sm">by {author}</p>
                <p className="text-text font-['NeueHaasGrotDisp'] text-xs">{date}</p>
            </div>
        </button>
    )
}
