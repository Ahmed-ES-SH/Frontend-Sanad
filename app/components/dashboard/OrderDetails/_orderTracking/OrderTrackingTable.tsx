"use client";

import type { OrderTrackingTableProps } from "./OrderTrackingTable.types";

/**
 * Order details card component
 * Displays key information about the order
 */
const OrderTrackingTable: React.FC<OrderTrackingTableProps> = ({ order }) => {
  return (
    <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      <div>
        <p className="caption text-surface-500 font-bold uppercase tracking-wider mb-1.5">
          Order ID
        </p>
        <p className="body-lg font-semibold text-surface-900 tabular-nums">
          {order.id}
        </p>
      </div>
      <div>
        <p className="caption text-surface-500 font-bold uppercase tracking-wider mb-1.5">
          Service Name
        </p>
        <p className="body-lg font-semibold text-surface-900">
          {order.serviceName}
        </p>
      </div>
      <div>
        <p className="caption text-surface-500 font-bold uppercase tracking-wider mb-1.5">
          Amount
        </p>
        <p className="display-md font-extrabold text-primary tabular-nums">
          {order.amount}{" "}
          <span className="body-sm font-medium text-surface-500 uppercase tracking-wide">
            {order.currency}
          </span>
        </p>
      </div>
      <div>
        <p className="caption text-surface-500 font-bold uppercase tracking-wider mb-1.5">
          Date Placed
        </p>
        <p className="body-lg font-semibold text-surface-900 tabular-nums">
          {order.placedDate}
        </p>
      </div>
      {order.notes && (
        <div className="sm:col-span-2">
          <p className="caption text-surface-500 font-bold uppercase tracking-wider mb-1.5">
            Order Notes
          </p>
          <p className="body text-surface-600">{order.notes}</p>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingTable;