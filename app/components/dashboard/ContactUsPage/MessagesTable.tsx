"use client";

import { ContactMessage } from "@/app/types/contact";
import { PaginationMeta } from "@/app/types/global";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale, LocaleType } from "@/app/hooks/useLocale";
import { MessagesTableHeader } from "./MessagesTableHeader";
import { EmptyState } from "./EmptyState";
import { MessageRow } from "./MessageRow";
import { PaginationControls } from "./PaginationControls";

export type MessageAction = "read" | "reply" | "delete";

export interface MessagesTableProps {
  messages: ContactMessage[];
  meta: PaginationMeta;
  page: number;
  onPageChange: (page: number) => void;
  onAction: (id: string, action: MessageAction) => void;
  isLoading?: boolean;
}

export function MessagesTable({
  messages,
  meta,
  page,
  onPageChange,
  onAction,
  isLoading,
}: MessagesTableProps) {
  const t = useTranslation("ContactUsPage.MessagesTable");
  const locale = useLocale() as LocaleType;

  const totalPages = meta?.lastPage ?? 1;

  console.log(meta)

  return (
    <section
      className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200/50 transition-opacity ${isLoading ? "opacity-50" : "opacity-100"}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <MessagesTableHeader />
          </thead>
          <tbody className="divide-y divide-stone-100">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              messages.map((message) => (
                <MessageRow
                  key={message.id}
                  message={message}
                  locale={locale}
                  onAction={onAction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        total={meta?.total ?? 0}
        currentPageItems={messages.length}
        isLoading={isLoading}
        locale={locale}
        onPageChange={onPageChange}
      />
    </section>
  );
}