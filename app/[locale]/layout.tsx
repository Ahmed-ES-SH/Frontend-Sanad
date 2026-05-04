/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { directionMap } from "../constants/global";
import { Locale } from "../types/global";
import { getTranslations } from "../helpers/getTranslations";
import { getSharedMetadata } from "../helpers/getSharedMetadata";

import ClientLayout from "../components/global/ClientLayout";
import Footer from "../components/global/_footer/Footer";
import Navbar from "../components/global/_navbar/Navbar";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale, "layoutMeta");
  const sharedMetaData = getSharedMetadata(locale, t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetaData,
  };
}

export default async function layout({ children, params }: any) {
  const { locale } = await params;
  return (
    <html
      lang={locale}
      dir={directionMap[locale as Locale]}
      className={`h-full antialiased ${inter.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-full flex flex-col font-body">
        <ClientLayout>
          <Navbar />
          <Toaster position="top-center" closeButton richColors />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
