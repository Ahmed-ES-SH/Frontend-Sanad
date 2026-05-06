import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getCategories } from "@/app/actions/blogActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import { getPublishedServices } from "@/app/actions/servicesActions";

import ServicesComponent from "@/app/components/website/services/ServicesComponent";
import ServicesNotFound from "@/app/components/website/services/ServicesNotFound";
import HowWeWork from "@/app/components/website/services/HowWeWork";
import { Locale } from "@/app/types/global";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const sharedMetadata = getSharedMetadata(
    locale ?? "en",
    translations.servicesMeta.title,
    translations.servicesMeta.description,
  );

  return {
    title: translations.servicesMeta.title,
    description: translations.servicesMeta.description,
    ...sharedMetadata,
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  // Parallelize fetches to eliminate waterfall - ~300ms saved
  const [categoriesResponse, servicesResponse] = await Promise.all([
    getCategories(),
    getPublishedServices(),
  ]);

  if (!servicesResponse) return <ServicesNotFound />;

  const { data: services, meta } = servicesResponse;

  return (
    <main id="main-content" className="relative mt-12">
      <ServicesComponent
        services={services}
        meta={meta}
        categories={categoriesResponse ?? []}
      />
      <HowWeWork locale={locale} />
      {/* <PricingPlans locale={locale} /> */}
    </main>
  );
}
