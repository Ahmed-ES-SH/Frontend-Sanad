/**
 * ActivityLogCard - Timeline of order updates
 */

import OrderTrackingTimeline from "@/app/components/dashboard/OrderDetails/_orderTracking/OrderTrackingTimeline";
import type { TimelineEntry } from "@/app/types/OrderTrackingTable.types";

interface ActivityLogCardProps {
  entries: TimelineEntry[];
  title: string;
}

export function ActivityLogCard({ entries, title }: ActivityLogCardProps) {
  return (
    <section
      className="bg-surface-card-bg rounded-2xl shadow-surface-sm border border-gray-200 overflow-hidden"
      aria-label={title}
    >
      <div className="bg-surface-50/80 px-6 sm:px-8 py-4 border-b border-gray-200">
        <h2 className="caption text-primary font-bold uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="p-6 sm:p-8">
        <OrderTrackingTimeline entries={entries} />
      </div>
    </section>
  );
}