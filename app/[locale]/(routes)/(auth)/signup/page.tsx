import React from "react";
import SignupForm from "@/app/components/auth/SignupForm";
import { getTranslations } from "@/app/helpers/getTranslations";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import AuthLayout from "@/app/components/auth/AuthLayout";
import { Locale } from "@/app/types/global";

interface PageParams {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const sharedMetadata = getSharedMetadata(
    locale ?? "ar",
    translations.signUpMeta.title,
    translations.signUpMeta.description,
  );

  return {
    title: translations.signUpMeta.title,
    description: translations.signUpMeta.description,
    ...sharedMetadata,
  };
}

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
