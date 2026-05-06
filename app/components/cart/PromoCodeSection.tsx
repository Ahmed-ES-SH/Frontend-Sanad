"use client";

import { Messages } from "@/app/hooks/useTranslation";
import { useState } from "react";
import { MdCheckCircle, MdErrorOutline, MdLocalOffer } from "react-icons/md";

interface PromoCodeSectionProps {
  t: Messages["cart"];
}

export default function PromoCodeSection({ t }: PromoCodeSectionProps) {
  const [promoCode, setPromoCode] = useState("");
  const [promoExpanded, setPromoExpanded] = useState(false);
  const [promoStatus, setPromoStatus] = useState<
    "idle" | "applied" | "invalid"
  >("idle");

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    // Placeholder: in production this would validate against an API
    if (promoCode.trim().toUpperCase() === "SANAD10") {
      setPromoStatus("applied");
    } else {
      setPromoStatus("invalid");
    }
  };

  return (
    <div className="border-t border-(--outline-variant)/10 bg-(--surface-container-low) px-5 py-4">
      {!promoExpanded ? (
        <button
          onClick={() => setPromoExpanded(true)}
          className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
        >
          <MdLocalOffer className="text-sm" />
          {t.promoCode}
        </button>
      ) : (
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setPromoStatus("idle");
              }}
              placeholder={t.promoCodePlaceholder}
              className="flex-1 px-3 py-2 text-xs bg-(--surface-container-lowest) border border-(--outline-variant)/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-(--on-surface) placeholder:text-(--on-surface-variant)/40"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyPromo();
              }}
            />
            <button
              onClick={handleApplyPromo}
              className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/10"
            >
              {t.applyPromo}
            </button>
          </div>
          {promoStatus === "applied" && (
            <p className="text-xs text-accent-emerald font-semibold flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
              <MdCheckCircle className="text-sm" />
              {t.promoApplied}
            </p>
          )}
          {promoStatus === "invalid" && (
            <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
              <MdErrorOutline className="text-sm" />
              {t.promoInvalid}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
