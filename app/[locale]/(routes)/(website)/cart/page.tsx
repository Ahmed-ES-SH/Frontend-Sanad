/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartPage } from "@/app/components/cart";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const sharedMetadata = getSharedMetadata(
    locale ?? "en",
    translations.cartMeta.title,
    translations.cartMeta.description,
  );

  return {
    title: translations.cartMeta.title,
    description: translations.cartMeta.description,
    ...sharedMetadata,
  };
}

export default function Cart() {
  return (
    <main
      id="main-content"
      className="mt-24 pt-10 relative h-full pb-12 px-4 md:px-8 w-full max-w-screen-2xl mx-auto"
    >
      <CartPage />
    </main>
  );
}
