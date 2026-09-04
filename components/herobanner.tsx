export default function HeroBanner() {
    return(
        <div className = "flex flex-row items-center justify-center w-full h-200 bg-[#232383]">
            <div className = "flex flex-col items-center justify-center w-120 h-full">
                <p className = "text-5xl font-['Hefring_Slab'] -mb-7 mr-70 ">the</p>
                <p className = "text-9xl/24 font-['Hefring_Slab'] w-120">central echo</p>
                <p className = "text-xl text-justify font-['NeueHaasGrotDisp'] mt-10 w-120">
                    LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.
                    UT ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT. DUISM.
                </p>
            </div>
            <img src = {"/assets/herobannerart.png"} className = "w-90 h-120"/>
        </div>
    )
}
