"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { statsData } from "@/app/constants/portfolio";
import { Locale } from "@/app/types/global";

interface Props {
  locale: Locale;
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar({ locale }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="c-container px-4 py-12 md:py-16">
      <div
        className="rounded-2xl border px-6 py-8 sm:px-10 sm:py-10"
        style={{
          backgroundColor: "var(--surface-50)",
          borderColor: "var(--surface-200)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="display-sm font-display mb-1"
                style={{ color: "var(--primary)" }}
              >
                {isInView ? (
                  <Counter target={stat.numericValue} suffix={stat.suffix} />
                ) : (
                  <span>
                    {stat.value}
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="body-sm" style={{ color: "var(--surface-500)" }}>
                {stat.label[locale]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
