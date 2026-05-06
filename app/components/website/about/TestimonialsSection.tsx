"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

import TestimonialsNavigationButtons from "./TestimonialsNavigationButtons";
import TestimonialSlider from "./TestimonialSlider";

export default function TestimonialsSection() {
  const t = useTranslation("testimonialsSection");
  const [isLoaded, setIsLoaded] = useState(false);

  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const ref = useRef(null);

  return (
    <>
      <section
        ref={ref}
        className="py-20 relative overflow-hidden"
        style={{ background: "var(--surface-50)" }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl font-bold mb-4"
              style={{ color: "var(--surface-900)" }}
            >
              {t.title}
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-16"
              style={{ color: "var(--surface-500)" }}
            >
              {t.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mx-auto"
          >
            <TestimonialSlider
              prevEl={prevEl}
              nextEl={nextEl}
              isLoaded={isLoaded}
              setIsLoaded={setIsLoaded}
            />

            {/* Custom Navigation Buttons */}
            <TestimonialsNavigationButtons
              setPrevEl={setPrevEl}
              setNextEl={setNextEl}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
