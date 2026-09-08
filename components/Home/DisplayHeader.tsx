import Link from 'next/link';

type HeaderData = {
    title: string;
    link: string;
}

export default function DisplayHeader({title, link}: HeaderData) {
    return(
        <div className ="flex flex-col w-full h-auto items-center justify-end mt-24 mb-12">
            <div className = "flex flex-row items-center justify-between w-1/2">
                <h1 className = "text-[#232383] text-4xl font-['Hefring_Slab_Bold']">{title}</h1>
                <Link href = {`/categories/${link}`}>
                    <button className = "flex flex-row items-center justify-center gap-2">
                        <span className = "text-[#232383] text-2xl font-['Hefring_Slab_Medium']">
                            SEE ALL
                        </span>
                        <img className = "w-4 h-4" src = "/assets/up-right-arrow.png"/>
                    </button>
                </Link>
            </div>
            <div className = "bg-[#232383] w-1/2 h-[2px]">
            </div>
        </div>
    )
}
