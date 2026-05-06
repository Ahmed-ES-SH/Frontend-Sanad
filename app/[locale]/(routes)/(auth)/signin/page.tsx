import AuthLayout from "@/app/components/auth/AuthLayout";
import SignInForm from "@/app/components/auth/_signin/SignInForm";
import { getTranslations } from "@/app/helpers/getTranslations";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { Locale } from "@/app/types/global";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.signInMeta.title;
  const description = translations.signInMeta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default function SigninPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
