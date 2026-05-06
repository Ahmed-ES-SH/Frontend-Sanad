import AuthLayout from "@/app/components/auth/AuthLayout";
import CheckYourInbox from "@/app/components/auth/CheckYourInbox";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";

interface PageParams {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.checkYourInbox.meta.title;
  const description = translations.checkYourInbox.meta.title;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default function CheckYourInboxPage() {
  return (
    <AuthLayout>
      <CheckYourInbox />
    </AuthLayout>
  );
}
