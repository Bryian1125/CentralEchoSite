type LargeDisplayCardProps = {
    name?: string;
    author?: string;
    readMoreLink?: string;
}

export default function LargeDisplayCard({ name = "Featured Article", author = "Author Name", readMoreLink = "#" }: LargeDisplayCardProps) {
    return (
        <div className="flex flex-col items-center justify-center w-[550] h-[550] rounded-4xl p-6 bg-background border-1 border-border shadow-xl relative overflow-clip">
            <img className="flex flex-col w-full h-full rounded-xl bg-secondary" />

            <div className="z-2 bg-gradient-to-t from-background to-background/0 h-1/2 w-full absolute bottom-0">
            </div>

            <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-6">
                <p className="text-text font-bold text-2xl font-['NeueHaasGrotDisp']">{name}</p>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-text font-['Hefring_Slab_Bold']">by {author}</p>
                    <a href={readMoreLink} className="text-text font-['Hefring_Slab_Medium'] underline">READ MORE</a>
                </div>
            </div>
        </div>
    )
}
