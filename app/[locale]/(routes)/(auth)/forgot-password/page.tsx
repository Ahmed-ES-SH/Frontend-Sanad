/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/app/components/auth/AuthLayout";
import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.forgotPassword.meta.title;
  const description = translations.forgotPassword.meta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
