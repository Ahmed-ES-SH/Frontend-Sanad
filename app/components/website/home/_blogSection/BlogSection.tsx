"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Article } from "@/app/types/blog";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";
import { directionMap } from "@/app/constants/global";
import LocaleLink from "@/app/components/global/LocaleLink";
import HomeBlogSlider from "./HomeBlogSlider";

interface BlogSliderProps {
  articles: Article[];
}

export default function BlogSection({ articles }: BlogSliderProps) {
  const locale = useLocale();
  const t = useTranslation("blogSection");
  const isRTL = locale === "ar";

  return (
    <div
      dir={directionMap[locale]}
      className="c-container max-lg:flex-col gap-12 lg:gap-20 flex items-center justify-between py-16 lg:py-24 border-t border-surface-200/50"
    >
      <div className="w-full lg:w-2/5 flex flex-col space-y-8">
        <div className={isRTL ? "text-right" : "text-left"}>
          <div className="space-y-4 mb-8">
            <h2 className="text-[2.25rem] lg:text-[3rem] font-bold text-surface-900 leading-[1.15] tracking-tight">
              {t.title} <span className="text-primary">{t.blogs}</span>
            </h2>
            <p className="text-[1.125rem] text-surface-600 leading-relaxed max-lg:mx-auto">
              {t.paragraphLine}
            </p>
          </div>

          <LocaleLink
            href="/blog"
            className="surface-btn-primary px-10 h-12 max-lg:mx-auto"
          >
            {t.button}
          </LocaleLink>
        </div>

        <div className="flex items-center gap-4 pt-4 max-lg:justify-center">
          <button
            id="slider-button-left"
            aria-label="Previous slide"
            className="surface-card-subtle w-12 h-12 flex justify-center items-center rounded-full hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 rtl:rotate-180"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            id="slider-button-right"
            aria-label="Next slide"
            className="surface-card-subtle w-12 h-12 flex justify-center items-center rounded-full hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 rtl:rotate-180"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* article slider  */}
      <HomeBlogSlider articles={articles} />
    </div>
  );
}
