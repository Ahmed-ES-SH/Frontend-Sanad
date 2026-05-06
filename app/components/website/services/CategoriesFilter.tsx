"use client";
import { Category, Locale } from "@/app/types/global";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

interface CategoriesFilterProps {
  activeFilter: Category | null;
  onActiveFilterChange: (category: Category | null) => void;
  categories: Category[];
  locale: Locale;
}

export default function CategoriesFilter({
  activeFilter,
  onActiveFilterChange,
  categories,
  locale,
}: CategoriesFilterProps) {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);

  const isRTL = locale === "ar";
  const t = useTranslation("servicesComponents");

  // We add an "All Services" category at the beginning
  const allCategory = {
    id: "all-0",
    name: t.allServices,
    slug: "all",
  } as Category;

  const allCategories = [allCategory, ...categories];

  return (
    <div className="relative group w-full  2xl:mx-auto px-4 md:px-0 2xl:max-w-4xl">
      <div
        className="flex items-center bg-surface-100 rounded-2xl border border-surface-200 p-1.5"
        role="tablist"
        aria-label={t.serviceCategories}
      >
        {/* Navigation Buttons - Only visible on desktop if needed */}
        <button
          ref={setPrevEl}
          className={`hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-surface-200 text-surface-600 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-0 z-30 shrink-0 ${
            isRTL ? "ml-2" : "mr-2"
          }`}
          aria-label={t.previousCategories}
        >
          {isRTL ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        <Swiper
          dir={isRTL ? "rtl" : "ltr"}
          slidesPerView={"auto"}
          freeMode={true}
          grabCursor={true}
          simulateTouch={true}
          touchEventsTarget="container"
          mousewheel={true}
          modules={[FreeMode, Mousewheel, Navigation]}
          navigation={{
            prevEl,
            nextEl,
          }}
          spaceBetween={12}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachEnd={() => setIsEnd(true)}
          onReachBeginning={() => setIsBeginning(true)}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {allCategories.map((cat) => {
            const isActive =
              activeFilter?.id === cat.id ||
              (cat.id === "all-0" && activeFilter === null);

            return (
              <SwiperSlide key={cat.id} className="!w-auto">
                <button
                  onClick={() =>
                    onActiveFilterChange(cat.id === "all-0" ? null : cat)
                  }
                  role="tab"
                  aria-selected={isActive}
                  className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none whitespace-nowrap  flex items-center justify-center ${
                    isActive
                      ? "text-white shadow-button"
                      : "text-surface-500 hover:text-surface-900 hover:bg-surface-200/50"
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeFilter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-primary rounded-xl -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>
                  {cat.name}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          ref={setNextEl}
          className={`hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-surface-200 text-surface-600 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-0 z-30 shrink-0 ${
            isRTL ? "mr-2" : "ml-2"
          }`}
          aria-label={t.nextCategories}
        >
          {isRTL ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Visual cues: Gradient edges to indicate scrollable area on mobile */}
      <AnimatePresence>
        {!isBeginning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-0 bottom-0 w-16 pointer-events-none bg-gradient-to-r from-surface-100 to-transparent z-20 rounded-2xl md:hidden ${
              isRTL ? "right-0 rotate-180" : "left-0"
            }`}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isEnd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-0 bottom-0 w-16 pointer-events-none bg-gradient-to-l from-surface-100 to-transparent z-20 rounded-2xl md:hidden ${
              isRTL ? "left-0 rotate-180" : "right-0"
            }`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
