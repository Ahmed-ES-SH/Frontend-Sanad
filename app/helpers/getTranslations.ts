import arTranslations from "../translations/ar.json";
import enTranslations from "../translations/en.json";

export const getTranslations = (locale: string, namespace?: string) => {
  const translations = locale === "ar" ? arTranslations : enTranslations;

  if (!namespace) {
    return translations;
  }

  // @ts-expect-error - dynamic namespace access
  return translations[namespace] || translations;
};