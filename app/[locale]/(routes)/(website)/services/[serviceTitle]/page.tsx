import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";
import {
  getPublishedServices,
  getServiceBySlug,
} from "@/app/actions/servicesActions";
import ServiceLayout from "@/app/components/website/services/_servicePage/ServiceLayout";
import ServiceNotFound from "@/app/components/website/services/_servicePage/ServiceNotFound";

interface ServicePageProps {
  params: Promise<{ local: string; serviceTitle: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { local, serviceTitle } = await params;
  const translations = getTranslations(local ?? "en");
  const sharedMetadata = getSharedMetadata(
    local ?? "en",
    translations.servicesMeta.title,
    translations.servicesMeta.description,
  );

  try {
    const service = await getServiceBySlug(serviceTitle);
    return {
      title: `Sanad Service - ${service.title}`,
      description: service.shortDescription,
      ...sharedMetadata,
    };
  } catch {
    return {
      title: translations.servicesMeta.title,
      description: translations.servicesMeta.description,
      ...sharedMetadata,
    };
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceTitle } = await params;

  const service = await getServiceBySlug(serviceTitle);

  const { data: relatedServices } = await getPublishedServices();

  if (!service) return <ServiceNotFound />;

  return (
    <ServiceLayout
      service={service}
      relatedServices={relatedServices?.slice(0, 8) ?? []}
    />
  );
}
