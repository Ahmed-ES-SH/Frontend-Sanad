"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export default function TransactionTableHeader() {
  const t = useTranslation("payments");

  return (
    <thead>
      <tr className="bg-stone-100">
        <th className="px-4 py-4 sm:px-6 text-[10px] font-semibold uppercase text-muted-foreground tracking-wider whitespace-nowrap">
          {t.columnDate}
        </th>
        <th className="px-4 py-4 sm:px-6 text-[10px] font-semibold uppercase text-muted-foreground tracking-wider whitespace-nowrap">
          {t.columnDescription}
        </th>
        <th className="px-4 py-4 sm:px-6 text-[10px] font-semibold uppercase text-muted-foreground tracking-wider whitespace-nowrap">
          {t.columnAmount}
        </th>
        <th className="px-4 py-4 sm:px-6 text-[10px] font-semibold uppercase text-muted-foreground tracking-wider whitespace-nowrap">
          {t.columnStatus}
        </th>
        <th className="px-4 py-4 sm:px-6 text-[10px] font-semibold uppercase text-muted-foreground tracking-wider text-right whitespace-nowrap">
          {t.columnAction}
        </th>
      </tr>
    </thead>
  );
}
