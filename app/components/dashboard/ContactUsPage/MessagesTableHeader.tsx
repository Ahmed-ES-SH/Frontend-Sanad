"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export function MessagesTableHeader() {
  const t = useTranslation("ContactUsPage.MessagesTable");

  return (
    <tr className="bg-stone-50/50 border-b border-stone-100">
      <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-stone-400">
        {t.sender}
      </th>
      <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-stone-400">
        {t.subject}
      </th>
      <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-stone-400">
        {t.received}
      </th>
      <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-stone-400">
        {t.status}
      </th>
      <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-stone-400 text-right">
        {t.actions}
      </th>
    </tr>
  );
}