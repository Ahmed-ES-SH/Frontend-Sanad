"use client";

import {
  FiHelpCircle,
  FiTrendingUp,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import type { SupportHubProps } from "./SupportHub.types";
import LocaleLink from "../global/LocaleLink";

const SupportHub: React.FC<SupportHubProps> = ({
  needAssistanceTitle,
  needAssistanceDescription,
  contactSupportText,
  exploreNewTitle,
  exploreNewDescription,
  browseServicesText,
  contactHref,
  servicesHref,
  isRTL,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-surface-200">
      {/* Support Card */}
      <div className="surface-card p-8 flex flex-col justify-between group">
        <div>
          <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
            <FiHelpCircle className="text-2xl text-surface-400 group-hover:text-primary transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold text-surface-900 font-display mb-3">
            {needAssistanceTitle}
          </h3>
          <p className="text-surface-500 font-body mb-6 line-clamp-2">
            {needAssistanceDescription}
          </p>
        </div>
        <LocaleLink
          href={contactHref}
          className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300"
        >
          <span>{contactSupportText}</span>
          {isRTL ? <FiChevronLeft /> : <FiChevronRight />}
        </LocaleLink>
      </div>

      {/* Growth Card (Primary CTA) */}
      <div className="rounded-2xl p-8 bg-gradient-primary text-white flex flex-col justify-between shadow-button group overflow-hidden relative">
        {/* Decorative background element */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
            <FiTrendingUp className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-bold font-display mb-3 text-white">
            {exploreNewTitle}
          </h3>
          <p className="text-white/80 font-body mb-6">
            {exploreNewDescription}
          </p>
        </div>
        <LocaleLink
          href={servicesHref}
          className="relative z-10 flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold w-fit hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span>{browseServicesText}</span>
          {isRTL ? <FiChevronLeft /> : <FiChevronRight />}
        </LocaleLink>
      </div>
    </section>
  );
};

export default SupportHub;
