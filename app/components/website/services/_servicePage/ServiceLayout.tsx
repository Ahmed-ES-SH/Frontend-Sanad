"use client";
import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Service, StaticServiceData } from "@/app/types/service";
import { servicesData } from "@/app/constants/services";
import {
  ServiceHero,
  ServiceAbout,
  ServiceProcess,
  ServiceFAQ,
  ServiceOrderCTA,
  RelatedServices,
} from "./";

interface ServiceLayoutProps {
  service?: Service | null;
  relatedServices: Service[] | null;
}

function mapBackendToStatic(backendService: Service): StaticServiceData {
  const staticService = servicesData[0];
  return {
    ...staticService,
    id: parseInt(backendService.id.replace(/-/g, "").slice(0, 8), 16) || 1,
    title: { en: backendService.title, ar: backendService.title },
    smallDesc: {
      en: backendService.shortDescription,
      ar: backendService.shortDescription,
    },
    fullImage: backendService.coverImageUrl ?? staticService.fullImage,
    description: {
      en: backendService.longDescription || "",
      ar: backendService.longDescription || "",
    },
    category:
      (backendService.category?.slug as StaticServiceData["category"]) ||
      "development",
  };
}

export default function ServiceLayout({
  service: backendService,
  relatedServices,
}: ServiceLayoutProps) {
  const locale = useLocale();
  const t_servicePage = useTranslation("servicePage");

  const staticService = servicesData[0];
  const service = backendService
    ? mapBackendToStatic(backendService)
    : staticService;

  return (
    <div dir={directionMap[locale]} className="min-h-screen mt-12 max-md:mt-20">
      <ServiceHero
        title={service.title}
        smallDesc={service.smallDesc}
        image={service.fullImage}
        category={service.category}
        stats={service.stats}
        locale={locale}
        translations={t_servicePage}
      />

      <ServiceAbout
        description={service.description}
        benefits={service.benefits}
        targetAudience={service.targetAudience}
        locale={locale}
        translations={t_servicePage}
      />

      <ServiceProcess
        steps={service.processSteps}
        locale={locale}
        translations={t_servicePage}
      />

      <ServiceFAQ
        faq={service.faq}
        locale={locale}
        translations={t_servicePage}
      />

      <ServiceOrderCTA
        service={backendService}
        locale={locale}
        translations={t_servicePage}
      />

      <RelatedServices
        services={relatedServices}
        translations={t_servicePage}
      />
    </div>
  );
}
