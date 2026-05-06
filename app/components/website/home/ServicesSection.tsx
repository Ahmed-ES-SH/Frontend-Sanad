"use client";

import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Service } from "@/app/types/service";

import ServiceCard from "../services/ServiceCard";
import LocaleLink from "../../global/LocaleLink";

export default function ServicesSection({ services }: { services: Service[] }) {
  const locale = useLocale();
  const t = useTranslation("services");

  return (
    <section
      dir={directionMap[locale]}
      className="relative py-20 lg:py-32 bg-surface-50"
    >
      <div className="c-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
              <span className="w-8 h-px bg-primary" />
              {t.subtitle}
            </span>
            <h2 className="text-[2.5rem] lg:text-[4rem] font-extrabold leading-[1.1] text-surface-900 tracking-tight">
              {t.title}
            </h2>
          </div>
          <p className="text-[1.125rem] text-surface-600 leading-relaxed max-w-md">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {services &&
            Array.isArray(services) &&
            services
              .slice(0, 8)
              .map((service) => (
                <ServiceCard
                  key={`${service.id}-${service.slug}`}
                  service={service}
                  t={t}
                />
              ))}
        </div>

        <div className="mt-20 flex justify-center">
          <LocaleLink
            href="/services"
            className="surface-btn-primary px-12 h-14 text-lg"
          >
            {t.cta}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
