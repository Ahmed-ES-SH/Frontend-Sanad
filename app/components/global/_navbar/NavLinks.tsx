"use client";

import { navLinks } from "@/app/constants/navbar";
import { useLocale } from "@/app/hooks/useLocale";
import { usePathname } from "next/navigation";
import LocaleLink from "../LocaleLink";

/**
 * NavLinks component for the Sanad platform.
 * Uses the display font (Plus Jakarta Sans) and provides clear active states.
 */
export default function NavLinks() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="links">
      <ul className="flex items-center gap-6 xl:gap-8 font-display">
        {navLinks.map((link, index) => {
          const isActive =
            pathname === `/${locale}${link.link}` ||
            (link.link === "/" && pathname === `/${locale}`);

          return (
            <LocaleLink
              href={link.link || "/#contactus"}
              key={index}
              className={`group text-[12px] whitespace-nowrap xl:text-[15px] font-bold tracking-tight transition-all duration-300 relative py-2 ${
                isActive
                  ? "text-primary"
                  : "text-surface-700 hover:text-primary"
              }`}
            >
              <span>{link.text[locale]}</span>

              {/* Animated Underline Indicator */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-1/2"
                }`}
              />
            </LocaleLink>
          );
        })}
      </ul>
    </div>
  );
}
