import React from "react";
import LocaleLink from "../LocaleLink";
import { socialIcons } from "@/app/constants/footer";
import { Messages } from "@/app/hooks/useTranslation";

interface FooterSocialIconsProps {
  t: Messages["footerLines"];
}

export default function FooterSocialIcons({ t }: FooterSocialIconsProps) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mt-10 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
      <ul className="flex items-center gap-5">
        {socialIcons.map(({ icon, translationKey }, idx) => (
          <li key={idx}>
            <LocaleLink
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full text-stone-400 hover:text-orange-400 hover:bg-stone-800 transition-all duration-200 hover:scale-105"
              aria-label={
                t.socialMedia[translationKey as keyof typeof t.socialMedia]
              }
            >
              {icon}
            </LocaleLink>
          </li>
        ))}
      </ul>

      {/* Copyright */}
      <p className="text-sm text-stone-500">
        {`© ${currentYear} Sanad. All rights reserved.`}
      </p>
    </div>
  );
}
