import { FiDollarSign, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { Messages } from "@/app/hooks/useTranslation";
import KPICard from "./KPICard";

interface KPICardsProps {
  t: Messages["payments"];
}

export default function KPICards({ t }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
      {/* Total Spent Card */}
      <KPICard
        icon={<FiDollarSign className="text-xl" />}
        iconLabel={t.kpi.totalSpentLabel}
        iconBg="bg-orange-50"
        iconColor="text-orange-600"
        badgeText={t.kpi.spentTrend}
        badgeVariant="success"
        label={t.kpi.totalSpentLabel}
        value="45,200"
        currency={t.kpi.currency}
        footer={
          <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-3/4 rounded-full" />
          </div>
        }
      />

      {/* Next Billing Card */}
      <KPICard
        icon={<FiCalendar className="text-xl" />}
        iconLabel={t.kpi.nextBillingLabel}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
        badgeText={t.kpi.daysLeft}
        badgeVariant="warning"
        label={t.kpi.nextBillingLabel}
        value="Nov 12, 2024"
        footer={
          <p className="text-xs text-muted-foreground mt-4">
            {t.kpi.automaticPayment}
          </p>
        }
      />

      {/* Pending Amount Card */}
      <KPICard
        icon={<FiCheckCircle className="text-xl" />}
        iconLabel={t.kpi.pendingAllSettledAria}
        iconBg="bg-green-50"
        iconColor="text-green-600"
        badgeText={t.kpi.allSettled}
        badgeVariant="neutral"
        label={t.kpi.pendingAmountLabel}
        value="0.00"
        currency={t.kpi.currency}
      />
    </div>
  );
}
