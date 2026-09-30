type LiteraryDisplayCardProps = {
    name?: string;
    author?: string;
    date?: string;
}

export default function LiteraryDisplayCard({ name = "Literary Work", author = "Author Name", date = "January 1, 2026" }: LiteraryDisplayCardProps) {
    return (
        <button className="flex flex-col items-start justify-center w-[260] h-full rounded-4xl bg-background border-1 border-border shadow-xl relative overflow-clip text-left">
            <img className="absolute inset-0 w-full h-full object-cover bg-secondary" />

            <div className="z-2 absolute inset-0 bg-gradient-to-t from-background to-transparent" />

            <div className="z-3 flex flex-col absolute bottom-0 left-0 right-0 p-4">
                <p className="text-text font-bold text-xl font-['NeueHaasGrotDisp']">{name}</p>
                <p className="text-text font-['Hefring_Slab_Bold'] text-md">by {author}</p>
                <p className="text-text font-['NeueHaasGrotDisp'] text-sm">{date}</p>
            </div>
        </button>
    )
}
