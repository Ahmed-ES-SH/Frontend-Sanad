"use client";
import Link from "next/link";
import type { Messages } from "@/app/hooks/useTranslation";
import { StaticServiceData } from "@/app/types/service";
import { formatTitle } from "@/app/helpers/formatTitle";
import Img from "@/app/components/global/Img";

type ServicePageMsgs = Messages["servicePage"];

interface props {
  services: StaticServiceData[];
  currentServiceSlug: string;
  local: "en" | "ar";
  translations: ServicePageMsgs;
}

export default function OtherServicesSidebar({
  services,
  currentServiceSlug,
  local,
  translations,
}: props) {
  const servicePage = translations;
  return (
    <div className="sticky h-[50vh] xl:h-[80vh] custom-scrollbar overflow-y-auto top-24 pr-2">
      <div className="surface-card p-6">
        <h3 className="heading-sm text-primary font-display mb-6">
          {servicePage.otherServices}
        </h3>
        <div className="space-y-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${local}/services/${formatTitle(
                service.title[local],
              )}?serviceId=${service.id}`}
              className={`block p-3 rounded-xl transition-all duration-300 ${
                service.slug === currentServiceSlug
                  ? "bg-primary/10 border border-primary/20 shadow-surface-sm"
                  : "hover:bg-surface-100 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 flex-shrink-0 bg-white/50 rounded-lg p-1.5 overflow-hidden border border-surface-200">
                  <Img
                    src={service.imgsrc}
                    alt={service.title[local]}
                    className="object-contain"
                  />
                </div>
                <span
                  className={`body font-medium transition-colors ${
                    service.slug === currentServiceSlug
                      ? "text-primary"
                      : "text-surface-600"
                  }`}
                >
                  {service.title[local]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
