"use client";
import { Messages } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

interface AboutHeroSectionProps {
  t: Messages["aboutPage"];
}

export default function AboutHeroSection({ t }: AboutHeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-48 pb-24 bg-surface-900 text-white">
      {/* Advanced Background Treatment */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grainy Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/big-wave.png')] bg-repeat mix-blend-overlay" />

        {/* Sophisticated Aura Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-violet/20 rounded-full blur-[160px]" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-linear(to_right,#ffffff05_1px,transparent_1px),linear-linear(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="c-container relative z-10 flex flex-col items-center text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase text-surface-300">
            {t.aboutLabel}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[3rem] lg:text-[5.5rem] font-black leading-none tracking-tight mb-8"
        >
          {t.hero_title}
          <span className="block text-primary italic font-serif mt-2 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            {t.smartTool}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg lg:text-2xl text-surface-300 max-w-2xl mx-auto leading-relaxed mb-12 opacity-80 font-medium"
        >
          {t.hero_description}
        </motion.p>
      </div>

      {/* Floating Abstract Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-linear-to-b from-primary to-transparent"
        />
      </div>
    </section>
  );
}
