/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Messages } from "@/app/hooks/useTranslation";

interface ThumbnailStripProps {
  single: boolean;
  images: string[];
  activeIndex: number;
  setThumbsSwiper: (swiper: SwiperType) => void;
  slideTo: (index: number) => void;
  t: Messages["ProjectPage"];
}

export default function ThumbnailStrip({
  single,
  images,
  activeIndex,
  setThumbsSwiper,
  slideTo,
  t,
}: ThumbnailStripProps) {
  return (
    <>
      {!single && (
        <div style={{ direction: "ltr" }}>
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode
            watchSlidesProgress
            className="w-full"
          >
            {images.map((img, idx) => {
              const isActive = activeIndex === idx;
              return (
                <SwiperSlide
                  key={idx}
                  style={{ width: "auto", height: "auto" }}
                >
                  <button
                    onClick={() => slideTo(idx)}
                    className="block relative overflow-hidden rounded-xl focus:outline-none"
                    style={{
                      width: "86px",
                      height: "60px",
                      flexShrink: 0,
                      border: isActive
                        ? "2.5px solid var(--primary)"
                        : "2px solid var(--surface-200)",
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? "scale(1.04)" : "scale(0.97)",
                      transition: "all 0.2s ease",
                      boxShadow: isActive
                        ? "0 0 0 3px rgba(249,115,22,0.2)"
                        : "none",
                    }}
                    aria-label={`${t.thumbnail} ${idx + 1}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
}
