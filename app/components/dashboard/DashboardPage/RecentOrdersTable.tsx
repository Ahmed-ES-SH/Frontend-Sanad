import { getAllOrders } from "@/app/actions/orderActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import type { AdminOrder } from "@/app/types/order";
import type { Locale } from "@/app/types/global";
import RecentOrdersTableClient from "./RecentOrdersTableClient";

interface RecentOrdersTableProps {
  locale: Locale;
}

export default async function RecentOrdersTable({ locale }: RecentOrdersTableProps) {
  const t = getTranslations(locale, "DashboardPage")?.RecentOrdersTable ?? {};

  let orders: AdminOrder[] = [];

  try {
    const result = await getAllOrders({ page: 1, limit: 5 });
    if (result.success && result.data) {
      orders = result.data.data ?? [];
    }
  } catch (err) {
    console.error("Failed to load recent orders:", err);
  }

  return (
    <RecentOrdersTableClient
      data={orders}
      title={t.title ?? "Recent Orders"}
      viewAllHref="/dashboard/orders"
      viewAllLabel={t.viewAll ?? "View All Orders"}
      emptyMessage={t.empty ?? "No orders yet."}
      translations={{
        id: t.id,
        user: t.user,
        service: t.service,
        status: t.status,
        amount: t.amount,
        date: t.date,
      }}
    />
  );
}
