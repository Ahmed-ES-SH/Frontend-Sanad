import NotificationsClient from "@/app/components/website/notifications/NotificationsClient";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.notificationsMeta.title;
  const description = translations.notificationsMeta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default function NotificationsPage() {
  return <NotificationsClient />;
}
