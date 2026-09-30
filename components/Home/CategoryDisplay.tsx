import DisplayHeader from "./DisplayHeader"
import SmallDisplayCard from "./SmallDisplayCard"
import LargeDisplayCard from "./LargeDisplayCard"

type CategoryDisplayProps = {
    title: string;
    link: string;
}

export default function CategoryDisplay({ title, link }: CategoryDisplayProps) {
    return (
        <div className="flex flex-col items-center justify-center mt-10 mb-10">
            <DisplayHeader
                title={title}
                link={link}
            />
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-[1200px] justify-center">
                <div className="flex flex-col gap-6">
                    <SmallDisplayCard />
                    <SmallDisplayCard />
                </div>
                <LargeDisplayCard />
            </div>
        </div>
    )
}
