/* eslint-disable @typescript-eslint/no-explicit-any */
import ContactPage from "@/app/components/website/contact/ContactPage";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.contactMeta.title;
  const description = translations.contactMeta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default function Contact() {
  return <ContactPage />;
}
