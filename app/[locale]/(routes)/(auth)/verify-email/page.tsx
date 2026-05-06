import React from "react";
import AuthLayout from "@/app/components/auth/AuthLayout";
import VerifyEmailContent from "@/app/components/auth/VerifyEmailContent";
import { getTranslations } from "@/app/helpers/getTranslations";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { Locale } from "@/app/types/global";

interface PageParams {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.verifyEmailMeta.title;
  const description = translations.verifyEmailMeta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <VerifyEmailContent />
    </AuthLayout>
  );
}
