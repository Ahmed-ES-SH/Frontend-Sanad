import ActiveProjectsTable from "@/app/components/dashboard/DashboardPage/ActiveProjectsTable";
import HeroWelcome from "@/app/components/dashboard/DashboardPage/HeroWelcome";
import KeyMetrics from "@/app/components/dashboard/DashboardPage/KeyMetrics";
import RecentActivity from "@/app/components/dashboard/DashboardPage/RecentActivity";
import ServicePerformance from "@/app/components/dashboard/DashboardPage/ServicePerformance";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto p-2 md:p-6 lg:p-8 space-y-6 bg-stone-50">
        <HeroWelcome />
        <KeyMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveProjectsTable />
          </div>
          <div className="space-y-6">
            <ServicePerformance />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}
