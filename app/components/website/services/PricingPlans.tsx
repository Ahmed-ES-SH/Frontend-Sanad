import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import { PricingPlansClient } from "./PricingPlansClient";

interface PricingPlansProps {
  locale: Locale;
}

export default function PricingPlans({ locale }: PricingPlansProps) {
  const t = getTranslations(locale, "pricing");
  const tComponents = getTranslations(locale, "servicesComponents");

  return <PricingPlansClient locale={locale} t={t} tComponents={tComponents} />;
}