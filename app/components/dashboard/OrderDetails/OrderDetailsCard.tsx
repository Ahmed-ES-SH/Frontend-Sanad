/**
 * OrderDetailsCard - Order information card with table
 */

import OrderTrackingTable from "@/app/components/dashboard/OrderDetails/_orderTracking/OrderTrackingTable";
import type { DisplayOrder } from "@/app/types/OrderTrackingTable.types";

interface OrderDetailsCardProps {
  order: DisplayOrder;
  title: string;
}

export function OrderDetailsCard({ order, title }: OrderDetailsCardProps) {
  return (
    <section
      className="bg-surface-card-bg rounded-2xl overflow-hidden shadow-surface-sm border border-gray-200"
      aria-label={title}
    >
      <div className="bg-surface-50/80 px-6 sm:px-8 py-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="caption text-primary font-bold uppercase tracking-wider">
          {title}
        </h2>
        <span className="bg-primary-100 text-primary px-3 py-1 rounded-full text-xs font-bold">
          {order.statusLabel}
        </span>
      </div>
      <OrderTrackingTable order={order} />
    </section>
  );
}