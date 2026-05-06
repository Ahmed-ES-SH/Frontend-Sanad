"use client";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiSettings,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import { directionMap } from "@/app/constants/global";
import { Messages } from "@/app/hooks/useTranslation";
import { Locale } from "@/app/types/global";

interface HowWeWorkClientProps {
  locale: Locale;
  t: Messages["howWeWork"];
  tComponents: Messages["servicesComponents"];
}

export function HowWeWorkClient({
  locale,
  t,
  tComponents,
}: HowWeWorkClientProps) {
  const isRTL = locale === "ar";

  const steps = [
    {
      num: "01",
      icon: <FiTarget />,
      title: { en: "Business Discovery", ar: "اكتشاف الأعمال" },
      desc: {
        en: "We map your current infrastructure to identify bottlenecks and transformation opportunities.",
        ar: "نقوم برسم بنية تحتية عملك الحالية لتحديد العقبات وفرص التحول.",
      },
    },
    {
      num: "02",
      icon: <FiSettings />,
      title: { en: "Technical Blueprint", ar: "المخطط التقني" },
      desc: {
        en: "Designing a scalable architecture using modern stacks (Next.js, Cloud-Native, AI).",
        ar: "تصميم بنية قابلة للتوسع باستخدام تقنيات حديثة (Next.js، سحابة، ذكاء اصطناعي).",
      },
    },
    {
      num: "03",
      icon: <FiTrendingUp />,
      title: { en: "Deployment & Scale", ar: "النشر والتوسع" },
      desc: {
        en: "Launching your solution with zero downtime and continuous performance monitoring.",
        ar: "إطلاق حلك مع ضمان استمرارية الخدمة ومراقبة الأداء المستمرة.",
      },
    },
  ];

  return (
    <section
      id="how-we-work"
      className="py-24 bg-surface-50 overflow-hidden"
      dir={directionMap[locale]}
    >
      <div className="c-container">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left: Content & Visual Roadmap */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block"
            >
              {t.sectionTitle}
            </motion.span>
            <h2 className="display-md font-display text-surface-900 mb-8 leading-tight">
              {t.sectionSubtitle}
            </h2>

            <div className="relative p-2 bg-surface-card-bg rounded-[2.5rem] shadow-surface-xl">
              <div className="aspect-[4/5] bg-surface-900 rounded-[2.2rem] overflow-hidden relative p-8">
                {/* Technical Roadmap Visual */}
                <div className="h-full flex flex-col justify-between">
                  {[1, 2, 3].map((node) => (
                    <div key={node} className="flex items-center gap-6">
                      <div
                        className={`size-12 rounded-xl border flex items-center justify-center ${node === 1 ? "bg-primary border-primary-light" : "border-surface-800 bg-surface-900"}`}
                      >
                        <div
                          className={`size-2 rounded-full ${node === 1 ? "bg-white" : "bg-surface-700"}`}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div
                          className={`h-2 rounded-full ${node === 1 ? "w-3/4 bg-primary/40" : "w-1/2 bg-surface-800"}`}
                        />
                        <div
                          className={`h-2 w-1/4 rounded-full ${node === 1 ? "bg-primary/20" : "bg-surface-800/50"}`}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Connecting Line */}
                  <div className="absolute left-[3.5rem] top-20 bottom-20 w-px bg-gradient-to-b from-primary to-surface-800" />
                </div>

                {/* Floating Metric */}
                <div className="absolute top-1/2 right-4 translate-y-[-50%] p-4 bg-primary rounded-2xl shadow-button">
                  <p className="caption text-primary-100 uppercase">
                    {tComponents.uptime}
                  </p>
                  <p className="heading-md font-display text-white">99.9%</p>
                </div>

                <div className="absolute bottom-10 inset-x-10">
                  <p className="text-white/30 caption-xs font-bold tracking-widest uppercase">
                    System Architecture Blueprint v2.0
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Vertical Steps with Faster Stagger */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                role="article"
                aria-labelledby={`step-title-${i}`}
                className="surface-card group flex gap-8 p-10 transition-all duration-300"
              >
                <div
                  className="display-sm font-display font-black text-surface-100 group-hover:text-primary-50 transition-colors duration-300"
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3
                    id={`step-title-${i}`}
                    className="heading-md font-display text-surface-900 mb-4 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-primary text-xl" aria-hidden="true">
                        {step.icon}
                      </span>
                      {step.title[locale]}
                    </span>
                    <FiArrowRight
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="body-lg text-surface-500 leading-relaxed">
                    {step.desc[locale]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
