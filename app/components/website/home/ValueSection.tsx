"use client";

import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import LocaleLink from "../../global/LocaleLink";
import Img from "../../global/Img";

export default function ValueSection() {
  const locale = useLocale();
  const t_value = useTranslation("companyValuesSection");
  const t_about = useTranslation("aboutSection");

  return (
    <section
      dir={directionMap[locale]}
      className="relative py-20 lg:py-32 overflow-hidden bg-surface-900 text-white"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-violet rounded-full blur-[120px]" />
      </div>

      <div className="c-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[2.25rem] sm:text-[3.5rem] font-bold leading-[1.1] tracking-tight">
                {t_value.title}
              </h2>
              <div className="w-20 h-1.5 bg-primary rounded-full" />
            </div>

            <p className="text-[1.25rem] text-surface-300 leading-relaxed max-w-xl">
              {t_value.description}
            </p>

            <div className="pt-6">
              <LocaleLink
                href="/about"
                className="surface-btn-primary px-10 h-14 text-lg"
              >
                {t_about.buttonText}
              </LocaleLink>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
              <Img
                src="/about-2.png"
                className="w-full max-w-[580px] object-contain drop-shadow-[0_20px_50px_rgba(99,102,241,0.3)] transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
