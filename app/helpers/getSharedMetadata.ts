const url = process.env.NEXT_PUBLIC_SITE_URL;

export const getSharedMetadata = (
  locale: string,
  title: string,
  description: string,
) => ({
  keywords: [
    "Sanad",
    "سند",
    "خدمات تقنية",
    "تطوير مواقع",
    "تحول رقمي",
    "برمجة مخصصة",
    "تصميم واجهات",
    "تطبيقات الويب",
    "دعم فني",
    "حلول برمجية",
    "شركة تقنية",
  ],
  openGraph: {
    title: title,
    description: description,
    url: `${url}/${locale}`, // رابط الصفحة بناءً على اللغة
    siteName: "Sanad - سند",
    images: [
      {
        url: `${url}/sanad-logo.png`,
        width: 1200,
        height: 630,
        alt:
          locale === "ar"
            ? "سند - خدمات تقنية متكاملة"
            : "Sanad - Integrated Tech Solutions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [`${url}/sanad-logo.png`],
  },
});
