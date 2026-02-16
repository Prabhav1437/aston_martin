'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface ValkyrieExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ValkyrieExperience({ scrollYProgress }: ValkyrieExperienceProps) {
    // --- Animation Phases ---

    // HERO: 0% -> 33%
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    // DESIGN: 33% -> 66%
    const designOpacity = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [0, 1, 1, 0]);
    const designX = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [-100, 0, 0, -100]);

    // ENGINE: 66% -> 100%
    const engineOpacity = useTransform(scrollYProgress, [0.66, 0.75, 1], [0, 1, 1]);
    const engineX = useTransform(scrollYProgress, [0.66, 0.75], [100, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden">

            {/* --- HERO SECTION --- */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-black/0 via-black/0 to-aston-black/80"
            >
                <div className="relative">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-rajdhani tracking-[0.5em] text-lime-essence/60 uppercase whitespace-nowrap">
                        Hypercar Project 001
                    </div>
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold font-orbitron tracking-tighter uppercase text-white mb-2 relative z-10 mix-blend-overlay opacity-90">
                        ASTON MARTIN
                    </h1>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black font-orbitron tracking-[0.15em] uppercase text-transparent [-webkit-text-stroke:1px_var(--color-lime-essence)] opacity-100 mt-[-0.3em] drop-shadow-[0_0_15px_rgba(209,226,49,0.3)]">
                        VALKYRIE
                    </h2>
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center gap-12 text-silver-fox">
                    <div className="flex flex-col items-center group cursor-default">
                        <span className="text-[10px] font-rajdhani tracking-[0.3em] text-lime-essence/80 uppercase mb-2">Base Price</span>
                        <span className="text-2xl font-orbitron text-white group-hover:text-lime-essence transition-colors">€3.2M</span>
                    </div>

                    <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-lime-essence/40 to-transparent hidden md:block" />

                    <div className="pointer-events-auto">
                        <button className="relative px-10 py-3 overflow-hidden group border border-lime-essence/30 hover:border-lime-essence transition-colors duration-500 bg-black/40 backdrop-blur-md">
                            <span className="absolute inset-0 w-full h-full bg-lime-essence/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                            <span className="relative font-orbitron font-bold tracking-[0.2em] text-sm text-white group-hover:text-lime-essence transition-colors">
                                INQUIRE
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* --- DESIGN SECTION --- */}
            <motion.div
                style={{ opacity: designOpacity, x: designX }}
                className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-24"
            >
                <div className="max-w-2xl bg-black/60 backdrop-blur-md p-10 border-l-[3px] border-lime-essence shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-lime-essence font-rajdhani text-sm tracking-[0.3em]">02 // AERO</span>
                        <div className="h-[1px] w-12 bg-lime-essence/50" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6 uppercase leading-[0.9]">
                        Radical <br /> <span className="text-transparent [-webkit-text-stroke:1px_var(--color-silver-fox)]">Form Factor</span>
                    </h2>
                    <p className="font-rajdhani text-lg md:text-xl text-gray-300 leading-relaxed font-light border-l border-white/10 pl-6">
                        An open underfloor maximizes downforce, while the all-carbon bodywork is shrink-wrapped around the mechanicals.
                    </p>
                </div>
            </motion.div>

            {/* --- ENGINE SECTION --- */}
            <motion.div
                style={{ opacity: engineOpacity, x: engineX }}
                className="absolute inset-0 flex flex-col justify-center items-end p-8 md:p-24 text-right"
            >
                <div className="max-w-xl bg-black/60 backdrop-blur-md p-10 border-r-[3px] border-lime-essence shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-4 mb-4 justify-end">
                        <div className="h-[1px] w-12 bg-lime-essence/50" />
                        <span className="text-lime-essence font-rajdhani text-sm tracking-[0.3em]">03 // POWER</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-8 uppercase tracking-tight">
                        Cosworth <span className="text-lime-essence">V12</span>
                    </h2>

                    <div className="flex flex-col gap-6 font-rajdhani">
                        <div className="flex flex-col">
                            <span className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-1">Configuration</span>
                            <span className="text-2xl font-semibold text-white">6.5L Naturally Aspirated</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-1">Combined Output</span>
                            <span className="text-4xl md:text-5xl font-bold text-lime-essence drop-shadow-[0_0_10px_rgba(209,226,49,0.3)]">1,160 BHP</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-1">Max RPM</span>
                            <span className="text-2xl font-semibold text-white">11,100</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* --- HUD ELEMENTS --- */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-60 font-rajdhani text-[10px] md:text-xs tracking-[0.2em] text-lime-essence mix-blend-screen">
                <div className="flex flex-col gap-1">
                    <span>SYSTEM_READY</span>
                    <span>COSWORTH_V12_DETECTED</span>
                </div>
                <div className="flex gap-8">
                    <span className="animate-pulse">SCROLL_INITIATED</span>
                    <span>///</span>
                    <span>AMR_TELEMETRY</span>
                </div>
            </div>

        </div>
    );
}
