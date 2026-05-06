"use client";

import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { directionMap } from "@/app/constants/global";
import Img from "../Img";
import FooterLinks from "./FooterLinks";
import EmailSubscription from "./EmailSubscription";
import FooterSocialIcons from "./FooterSocialIcons";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslation("footerLines");

  return (
    <footer
      dir={directionMap[locale]}
      className="w-full bg-stone-900 border-t border-stone-800"
    >
      {/* Newsletter Section */}
      <div className="c-container py-8">
        <div className="xl:w-[90%] xl:mx-auto">
          <div className="max-lg:flex-col max-lg:items-start max-lg:gap-6 flex items-start justify-between gap-8">
            {/* Brand Section */}
            <div className="flex items-start gap-3 max-lg:w-full">
              <div className="text-orange-500 shrink-0">
                <Img
                  src="/sanad-logo.png"
                  className="w-16 object-contain"
                  alt="Sanad"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-stone-100">
                  {t.heading}
                </h2>
                <p className="mt-3 text-stone-400 max-w-md">{t.description}</p>
              </div>
            </div>

            {/* Email Subscription */}
            <EmailSubscription t={t} />
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="c-container pt-8 pb-6">
        <div className="xl:w-[90%] xl:mx-auto">
          <FooterLinks t={t} />

          {/* Social Icons */}
          <FooterSocialIcons t={t} />
        </div>
      </div>
    </footer>
  );
}
