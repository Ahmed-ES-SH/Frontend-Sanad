"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiArrowRight,
  FiZap,
  FiTarget,
  FiShield,
} from "react-icons/fi";
import { directionMap } from "@/app/constants/global";
import { Messages } from "@/app/hooks/useTranslation";
import { Locale } from "@/app/types/global";

interface PricingPlansClientProps {
  locale: Locale;
  t: Messages["pricing"];
  tComponents: Messages["servicesComponents"];
}

export function PricingPlansClient({ locale, t, tComponents }: PricingPlansClientProps) {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: { en: "Foundation", ar: "التأسيس" },
      icon: <FiZap className="text-primary-light" />,
      price: isYearly ? "990" : "99",
      desc: {
        en: "Essential IT & Digital Presence",
        ar: "الأساسيات التقنية والتواجد الرقمي",
      },
      features: [
        { en: "Managed Cloud Hosting", ar: "استضافة سحابية مدارة" },
        { en: "Basic Security Audits", ar: "تدقيق أمني أساسي" },
        { en: "Next.js Web Starter", ar: "موقع Next.js أساسي" },
        { en: "Email & Chat Support", ar: "دعم عبر البريد والدردشة" },
      ],
    },
    {
      name: { en: "Growth", ar: "النمو" },
      icon: <FiTarget className="text-white" />,
      price: isYearly ? "2,490" : "249",
      popular: true,
      desc: {
        en: "Complete Scalable Infrastructure",
        ar: "بنية تحتية متكاملة وقابلة للتوسع",
      },
      features: [
        { en: "Custom CRM Integration", ar: "تكامل نظام إدارة العملاء" },
        { en: "Advanced SEO & Analytics", ar: "تحسين محركات البحث والتحليلات" },
        { en: "Priority 24/7 Response", ar: "استجابة ذات أولوية 24/7" },
        { en: "Monthly Tech Strategy", ar: "استراتيجية تقنية شهرية" },
        { en: "Performance Optimization", ar: "تحسين أداء النظام" },
      ],
    },
    {
      name: { en: "Enterprise", ar: "المؤسسات" },
      icon: <FiShield className="text-primary-light" />,
      price: isYearly ? "Custom" : "Custom",
      desc: {
        en: "Full Digital Transformation",
        ar: "تحول رقمي شامل للمؤسسات",
      },
      features: [
        { en: "Dedicated Account Team", ar: "فريق حسابات مخصص" },
        { en: "Custom AI Automations", ar: "أتمتة مخصصة بالذكاء الاصطناعي" },
        {
          en: "On-site Infrastructure Support",
          ar: "دعم البنية التحتية في الموقع",
        },
        { en: "Regulatory Compliance", ar: "الامتثال للمعايير التنظيمية" },
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 bg-surface-900 text-white overflow-hidden antialiased"
      dir={directionMap[locale]}
    >
      <div className="c-container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="surface-badge bg-white/5 text-primary-light border-white/10 mb-6 inline-block"
          >
            {t.title}
          </motion.span>
          <h2 className="display-md font-display font-bold mb-8 leading-tight">
            {t.subtitle}
          </h2>

          <div className="flex items-center justify-center gap-4">
            <span
              className={`body-sm font-medium ${!isYearly ? "text-white" : "text-surface-400"}`}
            >
              {tComponents.monthly}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              role="switch"
              aria-checked={isYearly}
              aria-label={
                locale === "en"
                  ? "Toggle yearly billing"
                  : "تبديل الفوترة السنوية"
              }
              className="w-14 h-7 bg-surface-800 rounded-full p-1 relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-900"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="size-5 bg-primary rounded-full shadow-button"
              />
            </button>
            <span
              className={`body-sm font-medium ${isYearly ? "text-white" : "text-surface-400"}`}
            >
              {tComponents.yearly}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className={`relative p-10 rounded-[2.5rem] flex flex-col transition-all duration-300 ${
                plan.popular
                  ? "bg-primary shadow-[0_40px_80px_-15px_rgba(99,102,241,0.4)] md:-mt-6 z-10"
                  : "bg-surface-800 border border-surface-700 hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary px-4 py-1 rounded-full caption-xs font-black uppercase tracking-widest shadow-xl">
                  {tComponents.mostPopular}
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-3 rounded-2xl ${plan.popular ? "bg-white/10" : "bg-surface-700"}`}
                >
                  {plan.icon}
                </div>
                <h3 className="heading-sm font-bold">{plan.name[locale]}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="display-sm font-display font-bold">
                    {plan.price !== "Custom" && "$"}
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span
                      className={
                        plan.popular ? "text-primary-100" : "text-surface-400"
                      }
                    >
                      {isYearly ? tComponents.perYear : tComponents.perMonth}
                    </span>
                  )}
                </div>
                <p
                  className={`body-sm mt-3 ${plan.popular ? "text-primary-100/70" : "text-surface-400"}`}
                >
                  {plan.desc[locale]}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 body-sm">
                    <FiCheck
                      className={
                        plan.popular ? "text-white" : "text-primary-light"
                      }
                    />
                    <span
                      className={
                        plan.popular ? "text-primary-50" : "text-surface-300"
                      }
                    >
                      {feature[locale]}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-surface-50"
                    : "bg-surface-700 text-white hover:bg-primary"
                }`}
              >
                {tComponents.getStarted} <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}