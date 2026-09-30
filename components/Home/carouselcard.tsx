type CarouselCardData = {
    category: string
    date: string
    title: string
    author: string
}

export default function CarouselCard({category, date, title, author}: CarouselCardData) {
    return (
        <div className = "w-[720px] h-[480px] aspect-video bg-background rounded-4xl relative overflow-clip border-1 border-border shadow-xl p-6">
            <div className = "z-3 flex flex-col -gap-4 w-full pr-5 pl-5 pb-4 absolute bottom-0">
                <p className = "text-primary font-bold uppercase text-sm font-['Hefring_Slab_Bold']">
                    {category} • <span className = "font-['NeueHaasGrotDisp']">{date}</span>
                </p>
                <p className = "text-3xl font-bold text-primary mt-2 font-['NeueHaasGrotDisp'] w-lg">
                    {title}
                </p>
                <div className = "flex flex-row items-center justify-between">
                    <p className = "text-primary font-['Hefring_Slab_Bold']">
                        by {author}
                    </p>

                    <button className ="flex flex-row items-center justify-center gap-2">
                        <h1 className = "text-2xl text-primary font-['Hefring_Slab_Medium']">
                            READ MORE
                        </h1>
                        <img className = "w-4 h-4" src = "/assets/up-right-arrow.png"/>
                    </button>
                </div>
            </div>
            <div className = "z-2 bg-gradient-to-t from-background to-background/0 h-1/2 w-full absolute bottom-0">
            </div>
            <img className = "w-full h-full aspect-video rounded-xl" src = "/assets/testimage.jpg"/>
        </div>
    )
}

