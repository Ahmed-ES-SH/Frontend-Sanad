/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/app/components/auth/AuthLayout";
import ResetPasswordForm from "@/app/components/auth/ResetPasswordForm";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.resetPassword.meta.title;
  const description = translations.resetPassword.meta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
