"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export function EmptyState() {
  const t = useTranslation("ContactUsPage.MessagesTable");

  return (
    <tr>
      <td
        colSpan={5}
        className="px-6 py-10 text-center text-stone-400 text-sm"
      >
        {t.emptyState}
      </td>
    </tr>
  );
}