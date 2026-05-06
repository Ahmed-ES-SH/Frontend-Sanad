"use client";
import { FiEdit, FiFileText } from "react-icons/fi";
import { Messages } from "@/app/hooks/useTranslation";
import { comingSoon } from "../_userDashboard/lib";

interface BillingSettingsProps {
  t: Messages["payments"];
}

export default function BillingSettings({ t }: BillingSettingsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {t.billing.title}
      </h2>
      <div className="bg-stone-100 rounded-xl p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase text-muted-foreground mb-1">
              {t.billing.emailLabel}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">
                finance@ahmed-khalil.com
              </span>
              <button
                className="text-sm text-orange-600 hover:text-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                aria-label={t.billing.editEmailAria}
              >
                <FiEdit />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase text-muted-foreground mb-1">
              {t.billing.taxIdLabel}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">VAT-SA-12398471</span>
              <button
                className="text-sm text-orange-600 hover:text-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                aria-label={t.billing.editTaxIdAria}
              >
                <FiEdit />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase text-muted-foreground mb-1">
              {t.billing.addressLabel}
            </label>
            <p className="text-sm text-muted-foreground leading-snug">
              {t.billing.addressValue}
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-stone-200/50">
          <button
            onClick={() => comingSoon(t.billing.manageTaxBtn)}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-white text-foreground border border-stone-200/50 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <FiFileText className="text-base" aria-hidden="true" />
            {t.billing.manageTaxBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
