/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion, useInView } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useTranslation } from "@/app/hooks/useTranslation";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import NavButton from "./NavButton";
import ThumbnailStrip from "./ThumbnailStrip";

interface GallerySliderProps {
  images: string[];
  title: string;
  isRTL: boolean;
  onOpen: (index: number) => void;
}

export function GallerySlider({
  images,
  title,
  isRTL,
  onOpen,
}: GallerySliderProps) {
  const t = useTranslation("ProjectPage");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<SwiperType | null>(null);

  const slideTo = useCallback((idx: number) => {
    mainRef.current?.slideTo(idx);
  }, []);

  const handlePrev = useCallback(() => {
    mainRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    mainRef.current?.slideNext();
  }, []);

  // Sync activeIndex when main swiper changes
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex ?? swiper.activeIndex);
  }, []);

  if (!images.length) return null;

  const single = images.length === 1;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      {/* ── Main Slider ───────────────────────────────── */}
      <div className="relative group" style={{ direction: "ltr" }}>
        <Swiper
          modules={[Thumbs, FreeMode]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onSwiper={(s) => {
            mainRef.current = s;
          }}
          onSlideChange={handleSlideChange}
          loop={!single}
          spaceBetween={0}
          className="w-full rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--surface-200)" }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <button
                onClick={() => onOpen(idx)}
                className="block w-full cursor-zoom-in focus:outline-none"
                aria-label={`${t.viewImage} ${idx + 1}`}
              >
                <div className="relative w-full aspect-[16/9] lg:aspect-[2.4/1] overflow-hidden bg-surface-100">
                  <img
                    src={img}
                    alt={`${title} — ${t.imageLabel} ${idx + 1}`}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.6s ease" }}
                  />
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── Custom Nav Buttons ── */}
        {!single && (
          <>
            {/* Prev */}
            <NavButton
              onClick={handlePrev}
              side="start"
              aria-label={isRTL ? t.next : t.previous}
              isRTL={isRTL}
              icon={<HiChevronLeft size={20} />}
            />

            {/* Next */}
            <NavButton
              onClick={handleNext}
              side="end"
              aria-label={isRTL ? t.previous : t.next}
              isRTL={isRTL}
              icon={<HiChevronRight size={20} />}
            />

            {/* Counter pill */}
            <div
              className="absolute bottom-4 end-4 z-10 px-3 py-1 rounded-full text-xs font-semibold pointer-events-none select-none"
              style={{
                background: "rgba(0,0,0,0.55)",
                color: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
              }}
            >
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnail Strip ───────────────────────────── */}
      <ThumbnailStrip
        single={single}
        images={images}
        activeIndex={activeIndex}
        setThumbsSwiper={setThumbsSwiper}
        slideTo={slideTo}
        t={t}
      />
    </motion.div>
  );
}
