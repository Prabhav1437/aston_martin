'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500",
                isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="flex items-center gap-4 group cursor-pointer">
                {/* Logo Mark */}
                <div className="w-8 h-[2px] bg-lime-essence group-hover:w-12 transition-all duration-300" />

                <div className="flex flex-col -gap-1">
                    <span className="text-xl font-bold tracking-[0.2em] font-orbitron text-white leading-none">
                        VALKYRIE
                    </span>
                    <span className="text-[10px] tracking-[0.4em] text-lime-essence/60 font-rajdhani hidden sm:block uppercase leading-none mt-1 group-hover:text-lime-essence transition-colors">
                        Aston Martin
                    </span>
                </div>
            </div>

            <button className="relative group px-8 py-2 overflow-hidden border border-white/10 hover:border-lime-essence/50 transition-colors">
                <span className="absolute inset-0 w-full h-full bg-lime-essence/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-xs font-bold tracking-[0.2em] font-orbitron text-white group-hover:text-lime-essence transition-colors uppercase">
                    Enquire
                </span>

                {/* Corner Accents */}
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-lime-essence opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-lime-essence opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
        </motion.nav>
    );
}
