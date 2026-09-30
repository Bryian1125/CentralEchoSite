type CarouselCardData = {
    category: string
    date: string
    title: string
    author: string
}

export default function CarouselCard({category, date, title, author}: CarouselCardData) {
    return (
        <div className="w-[720px] h-[480px] aspect-video bg-background rounded-4xl relative overflow-clip border-1 border-border shadow-xl">
            <img className="absolute inset-0 w-full h-full object-cover bg-secondary" />

            <div className="z-2 absolute inset-0 bg-gradient-to-t from-background to-transparent" />

            <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-6">
                <p className="text-text font-bold uppercase text-sm font-['Hefring_Slab_Bold']">
                    {category} • <span className="font-['NeueHaasGrotDisp']">{date}</span>
                </p>
                <p className="text-3xl font-bold text-text mt-2 font-['NeueHaasGrotDisp'] w-lg">
                    {title}
                </p>
                <div className="flex flex-row items-end justify-between">
                    <p className="text-text font-['Hefring_Slab_Bold']">
                        by {author}
                    </p>

                    <button className="flex flex-row items-center justify-center gap-2">
                        <h1 className="text-2xl text-text font-['Hefring_Slab_Medium']">
                            READ MORE
                        </h1>
                        <img className="w-4 h-4" src="/assets/up-right-arrow.png" />
                    </button>
                </div>
            </div>
        </div>
    )
}
