"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";

import "swiper/css";
import { Service } from "@/app/types/service";
import ServiceSlideCard from "./ServiceSlideCard";

interface ServicesSliderProps {
  services: Service[];
}

export default function ServicesSlider({ services }: ServicesSliderProps) {
  const locale = useLocale();
  const t = useTranslation("servicesSlider");
  return (
    <>
      <div
        dir={directionMap[locale]}
        className="content my-8 pt-8 border-t"
        style={{ borderColor: "var(--surface-200)" }}
      >
        <h2
          className="text-2xl font-bold"
          style={{ color: "var(--surface-900)" }}
        >
          {t.title}
        </h2>
        <p
          className="mt-3 text-sm sm:text-base leading-relaxed"
          style={{ color: "var(--surface-500)" }}
        >
          {t.description}
        </p>
      </div>
      <div id="swiper">
        <Swiper
          autoplay={{ delay: 2500 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            1536: { slidesPerView: 5 },
          }}
          modules={[Autoplay]}
          spaceBetween={30}
        >
          {services &&
            services.length > 0 &&
            services.map((service, index) => (
              <SwiperSlide key={index}>
                <ServiceSlideCard service={service} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
