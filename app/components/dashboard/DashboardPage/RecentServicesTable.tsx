import { getAdminServices } from "@/app/actions/servicesActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import type { Service } from "@/app/types/service";
import type { Locale } from "@/app/types/global";
import RecentServicesTableClient from "./RecentServicesTableClient";

interface RecentServicesTableProps {
  locale: Locale;
}

export default async function RecentServicesTable({ locale }: RecentServicesTableProps) {
  const t = getTranslations(locale, "DashboardPage")?.RecentServicesTable ?? {};

  let services: Service[] = [];

  try {
    const result = await getAdminServices({ page: 1, limit: 5 });
    services = result.data ?? [];
  } catch (err) {
    console.error("Failed to load recent services:", err);
  }

  return (
    <RecentServicesTableClient
      data={services}
      title={t.title ?? "Recent Services"}
      viewAllHref="/dashboard/services"
      viewAllLabel={t.viewAll ?? "View All Services"}
      emptyMessage={t.empty ?? "No services yet."}
      translations={{
        title: t.title,
        category: t.category,
        price: t.price,
        status: t.status,
        date: t.date,
      }}
    />
  );
}
