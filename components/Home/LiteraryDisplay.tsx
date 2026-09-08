import DisplayHeader from "./DisplayHeader.tsx"
import LiteraryDisplayCard from "./LiteraryDisplayCard.tsx"

export default function LiteraryDisplay() {
    return(
        <div className = "flex flex-col items-center justify-center mt-10 mb-10">
            <DisplayHeader
                title = "LITERARY"
            />
            <div className = "flex flex-row gap-3 w-full h-[450] justify-center items-align">
                <LiteraryDisplayCard />
                <LiteraryDisplayCard />
                <LiteraryDisplayCard />
                <LiteraryDisplayCard />
            </div>
        </div>
    )
} 
