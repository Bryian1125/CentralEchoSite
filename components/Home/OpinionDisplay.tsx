import DisplayHeader from "./DisplayHeader.tsx"
import SmallDisplayCard from "./SmallDisplayCard.tsx"
import LargeDisplayCard from "./LargeDisplayCard.tsx"

type Data = {
    link: string
}

export default function OpinionDisplay({link}: Data) {
    return(
        <div className = "flex flex-col items-center justify-center mt-10 mb-10">
            <DisplayHeader
                title = "OPINION"
                link = {link}
            />
            <div className = "flex flex-row gap-6 h-[550]">
                <div className = "flex flex-col h-full justify-between">
                    <SmallDisplayCard />
                    <SmallDisplayCard />
                </div>
                <LargeDisplayCard />
            </div>
        </div>
    )
}
