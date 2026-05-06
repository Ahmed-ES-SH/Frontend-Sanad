"use client";

import { formatPrice } from "@/app/helpers/formatPrice";
import { MdInfoOutline } from "react-icons/md";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";
import PromoCodeSection from "./PromoCodeSection";

interface OrderSummaryProps {
  subtotal: number;
  technicalFee: number;
  vat: number;
  total: number;
}

export function OrderSummary({ subtotal, vat, total }: OrderSummaryProps) {
  const locale = useLocale();
  const t = useTranslation("cart");

  return (
    <div className="surface-card overflow-hidden border-t-[3px] border-t-primary shadow-sm">
      {/* Receipt header */}
      <div className="px-5 py-4 border-b border-(--outline-variant)/10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-(--on-surface-variant)">
          {t.total}
        </h2>
      </div>

      {/* Receipt line items */}
      <div className="px-5 py-5">
        <dl className="space-y-3.5">
          <div className="flex justify-between items-baseline text-sm">
            <dt className="text-(--on-surface-variant)">{t.subtotal}</dt>
            <dd className="font-semibold text-(--on-surface) tabular-nums">
              {formatPrice(subtotal, locale)}
            </dd>
          </div>
          <div className="flex justify-between items-baseline text-sm group/tooltip relative">
            <dt className="text-(--on-surface-variant) flex items-center gap-1.5">
              {t.technicalFee}
              <MdInfoOutline
                className="text-xs text-(--on-surface-variant)/40 cursor-help hover:text-primary transition-colors"
                title={t.technicalFeeTooltip}
              />
            </dt>
            <dd className="font-semibold text-(--on-surface) tabular-nums">
              $0.00
            </dd>
          </div>
          <div className="flex justify-between items-baseline text-sm pb-1">
            <dt className="text-(--on-surface-variant)">{t.vat}</dt>
            <dd className="font-semibold text-(--on-surface) tabular-nums">
              {formatPrice(vat, locale)}
            </dd>
          </div>
        </dl>

        {/* Divider */}
        <div className="my-5 border-t-2 border-(--outline-variant)/10 border-dashed" />

        {/* Total */}
        <div className="flex justify-between items-end">
          <span className="text-base font-bold text-(--on-surface) pb-1">
            {t.total}
          </span>
          <div className="text-end">
            <span className="text-2xl font-black text-primary tabular-nums block leading-none tracking-tight">
              {formatPrice(total, locale)}
            </span>
            <p className="text-[10px] text-(--on-surface-variant) font-bold mt-1 uppercase tracking-wide">
              {t.includesTaxes}
            </p>
          </div>
        </div>
      </div>

      {/* Promo code section */}
      <PromoCodeSection t={t} />
    </div>
  );
}
