"use client";

import React, { useMemo } from "react";
import { AdminOrder } from "@/app/types/order";
import { useAdminOrdersWithState } from "@/app/hooks/useAdminOrdersWithState";
import { useTranslation } from "@/app/hooks/useTranslation";

import { OrdersTableHeader } from "./OrdersTableHeader";
import { OrdersTableRow } from "./OrdersTableRow";
import { OrdersLoadingSkeleton } from "./OrdersLoadingSkeleton";
import { OrdersEmptyState } from "./OrdersEmptyState";
import { OrdersErrorState } from "./OrdersErrorState";
import { OrdersPagination } from "./OrdersPagination";

interface OrdersTableProps {
  onViewOrder?: (orderId: string) => void;
  statusFilter?: string;
  userIdFilter?: number;
  initialPage?: number;
  initialLimit?: number;
}

export function OrdersTable({
  onViewOrder,
  statusFilter,
  userIdFilter,
  initialPage = 1,
  initialLimit = 10,
}: OrdersTableProps) {
  const t = useTranslation("OrdersPage");

  // Initialize the hook with filters
  const {
    orders,
    meta,
    isLoading,
    isFetching,
    error,
    setPage,
    setLimit,
    setStatus,
    filters,
  } = useAdminOrdersWithState({
    page: initialPage,
    limit: initialLimit,
    status: statusFilter !== "all" ? statusFilter : undefined,
    userId: userIdFilter,
  });

  // Sync external statusFilter changes
  React.useEffect(() => {
    setStatus((statusFilter !== "all" ? statusFilter : "") as string);
  }, [statusFilter, setStatus]);

  // Table columns definition
  const columns = useMemo(
    () => [
      {
        key: "orderId",
        label: t.table?.orderId || "Order ID",
      },
      {
        key: "user",
        label: t.table?.user || "User",
      },
      {
        key: "service",
        label: t.table?.service || "Service",
      },
      {
        key: "amount",
        label: t.table?.amount || "Amount",
      },
      {
        key: "status",
        label: t.table?.status || "Status",
      },
      {
        key: "date",
        label: t.table?.date || "Date",
      },
      {
        key: "actions",
        label: "",
      },
    ],
    [t],
  );

  // Loading state
  if (isLoading) {
    return <OrdersLoadingSkeleton />;
  }

  // Error state
  if (error) {
    return <OrdersErrorState error={error} />;
  }

  // Empty state
  if (!orders || orders.length === 0) {
    return <OrdersEmptyState />;
  }

  return (
    <div className="overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <OrdersTableHeader columns={columns} />
          <tbody className="divide-y divide-surface-50">
            {orders.map((order) => (
              <OrdersTableRow
                key={order.id}
                order={order}
                onViewOrder={onViewOrder}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && <OrdersPagination meta={meta} filters={filters} isFetching={isFetching} onPageChange={setPage} onLimitChange={setLimit} />}
    </div>
  );
}