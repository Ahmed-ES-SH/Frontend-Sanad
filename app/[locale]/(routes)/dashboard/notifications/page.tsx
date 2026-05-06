import NotificationsClient from "@/app/components/website/notifications/NotificationsClient";
import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import { Metadata } from "next";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = getTranslations(locale);
  const t = translations.dashboardNotificationsMeta;

  return {
    title: t.title,
    description: t.description,
  };
}

export default async function NotificationsPage() {
  return <NotificationsClient />;
}
