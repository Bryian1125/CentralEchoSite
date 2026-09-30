import DisplayHeader from "./DisplayHeader.tsx"
import LiteraryDisplayCard from "./LiteraryDisplayCard.tsx"

type Data = {
    link: string
}

export default function LiteraryDisplay({link}: Data) {
    return(
        <div className = "flex flex-col items-center justify-center mt-10 mb-10">
            <DisplayHeader
                title = "LITERARY"
                link = {link}
            />
            <div className = "flex flex-col md:flex-row gap-3 w-full h-auto md:h-[450] justify-center items-center md:items-align">
                <LiteraryDisplayCard />
                <LiteraryDisplayCard />
                <LiteraryDisplayCard />
                <LiteraryDisplayCard />
            </div>
        </div>
    )
}
