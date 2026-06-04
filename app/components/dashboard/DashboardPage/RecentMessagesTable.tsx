import { fetchContactMessages } from "@/app/actions/contactActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import type { ContactMessage } from "@/app/types/contact";
import type { Locale } from "@/app/types/global";
import RecentMessagesTableClient from "./RecentMessagesTableClient";

interface RecentMessagesTableProps {
  locale: Locale;
}

export default async function RecentMessagesTable({ locale }: RecentMessagesTableProps) {
  const t = getTranslations(locale, "DashboardPage")?.RecentMessagesTable ?? {};

  let messages: ContactMessage[] = [];

  try {
    const result = await fetchContactMessages({ page: 1, limit: 5, sortBy: "createdAt", order: "DESC" });
    if (result.success && result.data) {
      messages = result.data ?? [];
    }
  } catch (err) {
    console.error("Failed to load recent messages:", err);
  }

  return (
    <RecentMessagesTableClient
      data={messages}
      title={t.title ?? "Recent Messages"}
      viewAllHref="/dashboard/contactus"
      viewAllLabel={t.viewAll ?? "View All Messages"}
      emptyMessage={t.empty ?? "No messages yet."}
      translations={{
        name: t.name,
        subject: t.subject,
        status: t.status,
        date: t.date,
      }}
    />
  );
}
