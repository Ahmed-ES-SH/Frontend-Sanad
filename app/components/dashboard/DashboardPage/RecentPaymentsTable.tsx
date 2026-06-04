import { getInitialPayments } from "@/app/actions/paymentsActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import type { PaymentResponseDto } from "@/app/types/payments";
import type { Locale } from "@/app/types/global";
import RecentPaymentsTableClient from "./RecentPaymentsTableClient";

interface RecentPaymentsTableProps {
  locale: Locale;
}

export default async function RecentPaymentsTable({ locale }: RecentPaymentsTableProps) {
  const t = getTranslations(locale, "DashboardPage")?.RecentPaymentsTable ?? {};

  let payments: PaymentResponseDto[] = [];

  try {
    const result = await getInitialPayments({ page: 1, limit: 5 });
    if (result.success && result.data) {
      payments = result.data.data ?? [];
    }
  } catch (err) {
    console.error("Failed to load recent payments:", err);
  }

  return (
    <RecentPaymentsTableClient
      data={payments}
      title={t.title ?? "Recent Payments"}
      viewAllHref="/dashboard/payments"
      viewAllLabel={t.viewAll ?? "View All Payments"}
      emptyMessage={t.empty ?? "No payments yet."}
      translations={{
        id: t.id,
        amount: t.amount,
        status: t.status,
        description: t.description,
        date: t.date,
      }}
    />
  );
}
