"use client";
import { FiDownload } from "react-icons/fi";
import { Messages } from "@/app/hooks/useTranslation";
import { comingSoon } from "../_userDashboard/lib";

interface PaymentsHeaderProps {
  t: Messages["payments"];
}

export default function PaymentsHeader({ t }: PaymentsHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        <nav
          className="flex text-xs font-medium text-muted-foreground mb-2 gap-2 uppercase tracking-wide"
          aria-label="Breadcrumb"
        >
          <span>{t.header.breadcrumbAccount}</span>
          <span className="text-sm" aria-hidden="true">
            ›
          </span>
          <span className="text-orange-600 font-semibold">
            {t.header.breadcrumbPayments}
          </span>
        </nav>
        <h1 className="text-4xl font-black text-foreground tracking-tight">
          {t.header.title}
        </h1>
        <p className="text-muted-foreground mt-1">{t.header.description}</p>
      </div>
      <button
        onClick={() => comingSoon(t.header.downloadAllLabel)}
        className="bg-gradient-to-br from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label={t.header.downloadAllAria}
      >
        <FiDownload className="w-4 h-4" aria-hidden="true" />
        {t.header.downloadAllLabel}
      </button>
    </section>
  );
}
