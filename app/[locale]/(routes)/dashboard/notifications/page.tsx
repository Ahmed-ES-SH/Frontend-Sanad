import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import { Metadata } from "next";
import { FiBell } from "react-icons/fi";
import { AdminSendNotificationForm } from "../../../../components/dashboard/notifications/AdminSendNotificationForm";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = getTranslations(locale);
  const t = translations.dashboardNotificationsMeta;

  return {
    title: t.title,
    description: t.description,
  };
}

export default async function NotificationsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-primary to-accent-amber rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <FiBell className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-display text-surface-900 tracking-tight">
              Send Notification
            </h2>
            <p className="text-surface-500 mt-1 text-sm">
              Send push notifications to one or multiple users
            </p>
          </div>
        </div>
      </div>

      {/* Notification Form */}
      <AdminSendNotificationForm />
    </main>
  );
}
