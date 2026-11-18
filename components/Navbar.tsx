"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname !== "/") { return }

    if (latest < 10) {
      setVisible(true);
    } else if (latest > lastScrollY.current) {
      // Scrolling down — hide the bar.
      setVisible(false);
    } else {
      // Scrolling up — bring the bar back.
      setVisible(true);
    }
    lastScrollY.current = latest;
  });

  const handleSearchClick = () => {
    setSearchOpen(true);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // The invisible hover strip only re-hides the bar once the user has
  // scrolled away from the top of the page.
  const handleTriggerLeave = () => {
    setVisible(scrollY.get() < 10);
  };

  return (
    <>
      {/* Hover strip that reveals the bar after it hides on scroll. It sits
          BELOW the navbar (z-1 < z-5) so it never intercepts navbar clicks. */}
      <div
        className="fixed top-0 left-0 w-full h-30 z-1"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={handleTriggerLeave}
      />

      <motion.div
        animate={{ y: visible ? 0 : "-150%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed z-5 top-3 inset-x-4 md:inset-x-75 pl-3 pr-5 flex items-center justify-between h-13 gap-2 bg-background rounded-full border-1 border-border shadow-lg"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="left-0 flex flex-row gap-2 items-center justify-center"
          aria-label="The Central Echo - Home"
        >
          <div className="bg-primary w-8 h-8 [mask-image:url('/assets/celogo.png')] [mask-size:contain] [mask-repeat:no-repeat]" />
          <div className="bg-primary w-16 h-8 [mask-image:url('/assets/ceheader.png')] [mask-size:contain] [mask-repeat:no-repeat]" />
        </motion.button>

        <motion.button
          onClick={handleSearchClick}
          whileHover={{ scale: 1.02, backgroundColor: "var(--color-secondary)" }}
          whileTap={{ scale: 0.98 }}
          className="flex pl-3 pr-3 items-center justify-center rounded-full w-1/2 md:w-2/3 h-8 bg-background"
          aria-label="Search"
        >
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="bg-primary w-5 h-5 [mask-image:url('/assets/search.png')] [mask-size:contain] [mask-repeat:no-repeat]"
          />
        </motion.button>

        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center"
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-panel"
        >
          <div className="bg-primary w-4 h-4 [mask-image:url('/assets/hamburger.png')] [mask-size:contain] [mask-repeat:no-repeat]" />
        </motion.button>
      </motion.div>

      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          {/* Menu Panel */}
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-background border-l border-border shadow-xl p-6 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex justify-end mb-8">
              <motion.button
                onClick={closeMobileMenu}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <NavLinks onLinkClick={closeMobileMenu} />
          </motion.div>
        </>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}