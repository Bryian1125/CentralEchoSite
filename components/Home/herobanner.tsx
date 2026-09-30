import CarouselCard from "./CarouselCard.tsx"

export default function HeroBanner() {
    return(
        <div className = "flex flex-col items-center justify-center w-full h-360 bg-background pt-7 gap-4">
            <div className = "w-full h-full px-4 sm:px-8 md:px-6">
                <div className = "flex flex-row items-center justify-start w-full h-full bg-[url('/assets/Kismet.png')] pl-10 pr-10 rounded-2xl bg-cover">
                    <div className = "flex flex-col items-center justify-center w-200 h-full">
                        <p className = "text-5xl font-['Hefring_Slab_Bold'] -mb-7 mr-70 ">the</p>
                        <p className = "text-9xl/24 font-['Hefring_Slab_Bold'] w-120">central echo</p>
                        <p className = "text-xl text-justify font-['NeueHaasGrotDisp'] mt-10 w-120">
                            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD
                            TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM
                            VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX
                            EA COMMODO CONSEQUAT. DUISM.
                        </p>
                    </div>
                </div>
            </div>



            {/*CAROUSEL*/}
            <div className = "flex flex-row items-center justify-center mt-10">
                <div className = "flex flex-row items-center justify-center border-2 border-text rounded-full w-[200px] h-[50px] gap-2">
                    <p className = "text-xl font-['Hefring_Slab_Bold']">LATEST</p>
                    <p className = "text-xl font-['Hefring_Slab_Regular']">TODAY</p>
                </div>
                <div className = "bg-text w-256 h-[2px]"></div>
            </div>

            <div className = "flex flex-row items-center justify-center w-full h-xl mt-10 mb-10 gap-12 overflow-x-clip">
                <CarouselCard
                    category="OPINION"
                    date="August 11, 2026"
                    title=" Road Rules vs. Youthful Drive:
                              A Diversion Road Reality Check"
                    author="Author Name"
                />
                <CarouselCard
                    category="OPINION"
                    date="August 11, 2026"
                    title=" Road Rules vs. Youthful Drive:
                              A Diversion Road Reality Check"
                    author="Author Name"
                />
                <CarouselCard
                    category="OPINION"
                    date="August 11, 2026"
                    title=" Road Rules vs. Youthful Drive:
                    A Diversion Road Reality Check"
                    author="Author Name"
                />
            </div>
        </div>
    )
}
