'use client';

import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import ValkyrieScrollCanvas from '@/components/ValkyrieScrollCanvas';
import ValkyrieExperience from '@/components/ValkyrieExperience';
import { FRAMES_COUNT } from '@/data/carData';
import { ReactLenis } from 'lenis/react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the 600vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <ReactLenis root>
      <main className="bg-aston-black min-h-screen selection:bg-lime-essence selection:text-black">
        <Navbar />

        {/* SCROLL SEQUENCE (Locked for 600vh) */}
        <section ref={containerRef} className="h-[600vh] relative">
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
            {/* Layer 0: Canvas */}
            <div className="absolute inset-0 z-0">
              <ValkyrieScrollCanvas
                scrollYProgress={scrollYProgress}
                totalFrames={FRAMES_COUNT}
                imageFolderPath="/images/valkyrie-sequence"
              />
            </div>

            {/* Layer 10: HUD / Experience */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <ValkyrieExperience scrollYProgress={scrollYProgress} />
            </div>
          </div>
        </section>

        {/* REST OF SITE (Scrolls naturally after sequence) */}
        <div className="relative z-20 bg-aston-black text-white">

          {/* Specs Grid */}
          <section className="py-32 px-8 border-t border-white/5 bg-gradient-to-b from-aston-black to-deep-green">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-orbitron mb-16 uppercase tracking-widest text-center text-white/90">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                {/* Manually mapping important specs for layout control */}
                {[
                  { label: "Engine Composition", value: "6.5L V12" },
                  { label: "Power Output", value: "1,160 BHP" },
                  { label: "Torque", value: "900 Nm" },
                  { label: "Acceleration (0-60)", value: "< 2.5s" },
                  { label: "Dry Weight", value: "1,030 kg" },
                  { label: "Peak Downforce", value: "1,100 kg" },
                ].map((spec, i) => (
                  <div key={i} className="group relative p-12 bg-aston-black hover:bg-white/5 transition-colors duration-500 flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime-essence/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    <div className="text-silver-fox font-rajdhani uppercase tracking-[0.2em] mb-4 text-sm">{spec.label}</div>
                    <div className="text-3xl md:text-5xl font-orbitron font-bold text-white group-hover:text-lime-essence transition-colors duration-300">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features / F1 Tech */}
          <section className="py-40 px-8 bg-carbon-gray relative overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-essence/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
              <span className="text-lime-essence font-rajdhani tracking-[0.4em] uppercase mb-6 text-sm">Engineered by Red Bull Advanced Technologies</span>
              <h2 className="text-5xl md:text-7xl font-orbitron mb-12 uppercase tracking-tighter text-center leading-none">
                Formula 1™ <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">For The Road</span>
              </h2>
              <p className="font-rajdhani text-xl md:text-2xl text-silver-fox max-w-4xl text-center leading-relaxed font-light">
                Every element of the Valkyrie is honed for performance. The open underfloor maximizes downforce while the all-carbon fiber bodywork minimizes weight to a strictly engineered 1:1 power-to-weight ratio.
              </p>

              <button className="mt-16 px-12 py-4 border border-lime-essence/30 text-lime-essence font-orbitron tracking-[0.2em] hover:bg-lime-essence hover:text-black transition-all duration-300 uppercase text-sm">
                Explore Aerodynamics
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-20 border-t border-white/5 bg-black text-center relative">
            <div className="mb-8 opacity-80">
              <span className="text-4xl md:text-6xl font-orbitron font-bold tracking-[0.1em] text-white">SCROLL TO START</span>
            </div>
            <div className="mb-8">
              <span className="text-xl font-orbitron font-bold tracking-widest text-lime-essence">ASTON MARTIN</span>
            </div>
            <p className="text-gray-600 font-rajdhani text-xs tracking-widest">© 2026 Aston Martin Lagonda. All Rights Reserved.</p>
          </footer>

        </div>
      </main>
    </ReactLenis>
  );
}
