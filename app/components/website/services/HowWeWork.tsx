import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import { HowWeWorkClient } from "./HowWeWorkClient";

interface HowWeWorkProps {
  locale: Locale;
}

export default function HowWeWork({ locale }: HowWeWorkProps) {
  const t = getTranslations(locale);
  const tComponents = getTranslations(locale, "servicesComponents");

  return <HowWeWorkClient locale={locale} t={t} tComponents={tComponents} />;
}