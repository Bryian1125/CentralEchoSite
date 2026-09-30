"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { usePathname } from "next/navigation"

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const { scrollY } = useScroll();
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (pathname !== "/") {return}

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
                className="fixed top-0 left-0 w-full h-30 z-10"
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            />

            <motion.div
                animate = {{y: visible ? 0 : "-150%"}}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className = "fixed z-5 top-3 pl-3 pr-5 inset-x-75 flex items-center justify-between h-13 bg-background rounded-full border-1 border-border shadow-lg">
                <button className ="left-0 flex flex-row gap-2 items-center justify-center">
                    <div
                        className="bg-primary w-8 h-8 [mask-image:url('/assets/celogo.png')] [mask-size:contain] [mask-repeat:no-repeat]"
                    />
                    <div
                        className="bg-primary w-16 h-8 [mask-image:url('/assets/ceheader.png')] [mask-size:contain] [mask-repeat:no-repeat"
                    />

                </button>

                <div className = "flex pl-3 pr-3 items-center rounded-full w-2/3 h-8 bg-background">
                    <div
                        className="bg-primary w-5 h-5 [mask-image:url('/assets/search.png')] [mask-size:contain] [mask-repeat:no-repeat]"
                    />
                </div>
                <button>
                    <div
                        className="bg-primary w-4 h-4 [mask-image:url('/assets/hamburger.png')] [mask-size:contain] [mask-repeat:no-repeat]"
                    />
                </button>
            </motion.div>
        </>
    )
}
