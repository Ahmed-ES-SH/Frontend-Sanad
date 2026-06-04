import ActiveProjectsTable from "@/app/components/dashboard/DashboardPage/ActiveProjectsTable";
import HeroWelcome from "@/app/components/dashboard/DashboardPage/HeroWelcome";
import KeyMetrics from "@/app/components/dashboard/DashboardPage/KeyMetrics";
import RecentActivity from "@/app/components/dashboard/DashboardPage/RecentActivity";
import RecentOrdersTable from "@/app/components/dashboard/DashboardPage/RecentOrdersTable";
import RecentPaymentsTable from "@/app/components/dashboard/DashboardPage/RecentPaymentsTable";
import RecentUsersTable from "@/app/components/dashboard/DashboardPage/RecentUsersTable";
import RecentProjectsTable from "@/app/components/dashboard/DashboardPage/RecentProjectsTable";
import RecentServicesTable from "@/app/components/dashboard/DashboardPage/RecentServicesTable";
import RecentMessagesTable from "@/app/components/dashboard/DashboardPage/RecentMessagesTable";
import RecentArticlesTable from "@/app/components/dashboard/DashboardPage/RecentArticlesTable";
import ServicePerformance from "@/app/components/dashboard/DashboardPage/ServicePerformance";
import { LocaleType } from "@/app/hooks/useLocale";

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = (await params) as { locale: LocaleType };
  return (
    <section className="p-2 md:p-6 lg:p-8 space-y-6 bg-stone-50">
      <HeroWelcome />
      <KeyMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActiveProjectsTable />
          <RecentOrdersTable locale={locale} />
          <RecentPaymentsTable locale={locale} />
          <RecentUsersTable locale={locale} />
          <RecentProjectsTable locale={locale} />
          <RecentServicesTable locale={locale} />
          <RecentMessagesTable locale={locale} />
          <RecentArticlesTable locale={locale} />
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <ServicePerformance />
          <RecentActivity />
        </aside>
      </div>
    </section>
  );
}
