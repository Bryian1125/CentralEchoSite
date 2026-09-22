"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest < 10) {
            setVisible(true);
        } else if (latest > lastScrollY.current) {
            setVisible(false);
        } else {
            setVisible(false);
        }
        lastScrollY.current = latest;
    })

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-10 z-10"
                onMouseEnter={() => setVisible(true)}
            />

            <motion.div
                animate = {{y: visible ? 0 : "-150%"}}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className = "fixed z-5 top-3 pl-2 pr-5 inset-x-75 flex items-center justify-between h-13 bg-[#FFFFFFE6] rounded-full border-5 border-white shadow outline-1 outline-[#7a7a7a80]">
                <button className ="left-0 flex flex-row gap-2 items-center justify-center">
                    <div
                        className="bg-[#2794d8] w-8 h-8 [mask-image:url('/assets/celogo.png')] [mask-size:contain] [mask-repeat:no-repeat]"
                    />
                    <div
                        className="bg-[#2794d8] w-16 h-8 [mask-image:url('/assets/ceheader.png')] [mask-size:contain] [mask-repeat:no-repeat"
                    />

                </button>

                <div className = "flex pl-3 pr-3 items-center rounded-full w-2/3 h-8 bg-[#FFFFFF]">
                    <div
                        className="bg-[#2794d8] w-5 h-5 [mask-image:url('/assets/search.png')] [mask-size:contain] [mask-repeat:no-repeat]"
                    />
                </div>
                <button>
                    <div
                        className="bg-[#2794d8] w-4 h-4 [mask-image:url('/assets/hamburger.png')] [mask-size:contain] [mask-repeat:no-repeat]"
                    />
                </button>
            </motion.div>
        </>
    )
}
