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
                animate = {{y: visible ? 0 : "-100%"}}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className = "fixed z-5 top-0 pl-15 pr-15 flex items-center justify-between w-full h-22 bg-[#232383]">
                <button className ="left-0 flex flex-row gap-2 items-center justify-center">
                    <img className = "w-8 h-8" src = {"/assets/celogo.png"}></img>
                    <img className = "w-16 h-8" src = {"/assets/ceheader.png"}></img>
                </button>

                <div className = "flex pl-3 pr-3 items-center rounded-lg w-128 h-9 bg-white">
                    <img className = "w-5 h-5" src = {"/assets/search.png"}></img>
                </div>
                <button>
                    <img className = "flex ml-18 w-7 h-7" src = {"/assets/hamburger.png"}></img>
                </button>
            </motion.div>
        </>
    )
}
