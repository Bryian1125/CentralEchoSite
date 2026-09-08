type Data = {
    title: string
}

export default function SectionHeader({title}: Data) {
    return (
        <div className = "flex flex-row w-3xl h-32 items-center justify-center pt-10 gap-2 text-nowrap pb-10">
            <h1 className ="text-xl text-[#232383] font-[Hefring_Slab_Bold]">{title}</h1>
            <div className = "w-full h-1 bg-[#232383]"></div>
        </div>
    )
}

