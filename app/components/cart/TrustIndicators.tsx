"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import {
  MdVerifiedUser,
  MdAssignmentTurnedIn,
  MdSupportAgent,
} from "react-icons/md";

export function TrustIndicators() {
  const t = useTranslation("cart");

  const trustFeatures = [
    {
      icon: <MdVerifiedUser className="text-[17px] text-primary shrink-0" />,
      title: t.trustIndicators.secureCheckout,
      description: t.trustIndicators.encryption,
    },
    {
      icon: (
        <MdAssignmentTurnedIn className="text-[17px] text-primary shrink-0" />
      ),
      title: t.trustIndicators.verifiedPartner,
      description: t.trustIndicators.standards,
    },
    {
      icon: <MdSupportAgent className="text-[17px] text-primary shrink-0" />,
      title: t.trustIndicators.support,
      description: t.trustIndicators.assistance,
    },
  ];

  return (
    <section
      className="py-8 border-t border-(--outline-variant)/10"
      aria-label={t.trustIndicators.sectionTitle}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-(--on-surface-variant) mb-5">
        {t.trustIndicators.sectionTitle}
      </p>
      {/* Compact inline list — no card grid */}
      <ul className="flex flex-wrap gap-x-8 gap-y-4">
        {trustFeatures.map((feature) => (
          <li key={feature.title} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
              {feature.icon}
            </div>
            <div>
              <span className="text-xs font-bold text-(--on-surface) block leading-tight">
                {feature.title}
              </span>
              <span className="text-[10px] text-(--on-surface-variant) block mt-0.5">
                {feature.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
