type SmallDisplayCardProps = {
    name?: string;
    author?: string;
    readMoreLink?: string;
}

export default function SmallDisplayCard({ name = "Article Title", author = "Author Name", readMoreLink = "#" }: SmallDisplayCardProps) {
    return (
        <div className="flex flex-col items-center justify-center w-[480] h-[265] rounded-4xl p-6 bg-background border-1 border-border shadow-xl relative overflow-clip">
            <img className="flex flex-col w-full h-full rounded-xl bg-secondary" />

            <div className="z-2 bg-gradient-to-t from-background to-background/0 h-1/2 w-full absolute bottom-0">
            </div>

            <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-4">
                <p className="text-text font-bold text-lg font-['NeueHaasGrotDisp']">{name}</p>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-text font-['Hefring_Slab_Bold'] text-sm">by {author}</p>
                    <a href={readMoreLink} className="text-text font-['Hefring_Slab_Medium'] text-sm underline">READ MORE</a>
                </div>
            </div>
        </div>
    )
}
