"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

interface OrderNotesProps {
  notes: string | null;
}

export function OrderNotes({ notes }: OrderNotesProps) {
  const t = useTranslation("orderDetail");

  if (!notes) return null;

  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{t.notes}</h3>
      <p className="text-gray-700">{notes}</p>
    </div>
  );
}
