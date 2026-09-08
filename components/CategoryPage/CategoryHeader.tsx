type Data = {
    title: string
}

export default function CategoryHeader({title}: Data) {
    return (
        <div className = "flex flex-col w-full h-32 items-center justify-center pt-20 pb-20">
            <h1 className ="text-lg text-[#232383] font-[Hefring_Slab_Bold]">CATEGORY ARCHIVES</h1>
            <h1 className ="text-7xl text-[#232383] font-[Hefring_Slab_Bold]">{title}</h1>
        </div>
    )
}

