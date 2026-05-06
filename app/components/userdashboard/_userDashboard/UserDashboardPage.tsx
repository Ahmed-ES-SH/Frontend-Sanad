"use client";

import UserProfileHeader from "./UserProfileHeader";
import StatsRow from "./StatsRow";
import QuickStartBanner from "./QuickStartBanner";
import QuickActions from "./QuickActions";
import ActiveDeliverables from "./ActiveDeliverables";
import QuickSettings from "./QuickSettings";
import RecentActivityTable from "./RecentActivityTable";
import { useLocale } from "@/app/hooks/useLocale";
import { directionMap } from "@/app/constants/global";

export default function UserDashboardPage() {
  const locale = useLocale();
  return (
    <div
      dir={directionMap[locale]}
      className="min-h-screen mt-24 mb-4 c-container flex flex-col"
    >
      <main className="flex-1  space-y-8 w-full">
        <UserProfileHeader />
        <StatsRow />
        <QuickStartBanner />
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ActiveDeliverables />
          </div>
          <div className="lg:col-span-1">
            <QuickSettings />
          </div>
        </div>
        <RecentActivityTable />
      </main>
    </div>
  );
}
