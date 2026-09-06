import DisplayHeader from "./DisplayHeader.tsx"
import SmallDisplayCard from "./SmallDisplayCard.tsx"
import LargeDisplayCard from "./LargeDisplayCard.tsx"

export default function FeatureDisplay() {
    return(
        <div className = "flex flex-col items-center justify-center mt-10 mb-10">
            <DisplayHeader
                title = "FEATURE"
            />
            <div className = "flex flex-row gap-6 h-[370]">
                <div className = "flex flex-col h-full justify-between">
                    <SmallDisplayCard />
                    <SmallDisplayCard />
                </div>
                <LargeDisplayCard />
            </div>
        </div>
    )
} 
