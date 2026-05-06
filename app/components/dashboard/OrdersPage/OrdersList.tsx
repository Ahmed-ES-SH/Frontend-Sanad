"use client";

import { useState, useEffect } from "react";
import { useMyOrders } from "@/app/hooks/useMyOrders";
import { OrderCard } from "./OrderCard";
import { OrdersLoadingState } from "./OrdersLoadingState";
import { OrdersEmptyState } from "./OrdersEmptyState";
import { OrdersErrorState } from "./OrdersErrorState";
import { OrdersPagination } from "./OrdersPagination";

interface OrdersListProps {
  onPayClick?: (orderId: string) => void;
}

export function OrdersList({ onPayClick }: OrdersListProps) {
  const { orders, meta, isLoading, error, fetchOrders } = useMyOrders();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders({ page: 1, limit: 10 });
  }, [fetchOrders]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchOrders({ page, limit: 10 });
  };

  const handleRetry = () => {
    fetchOrders({ page: currentPage, limit: 10 });
  };

  if (isLoading && orders.length === 0) {
    return <OrdersLoadingState />;
  }

  if (error) {
    return <OrdersErrorState error={error} onRetry={handleRetry} />;
  }

  if (orders.length === 0) {
    return <OrdersEmptyState />;
  }

  return (
    <div className="space-y-4">
      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onPayClick={onPayClick} />
        ))}
      </div>

      {/* Pagination */}
      {meta && <OrdersPagination meta={meta} currentPage={currentPage} onPageChange={handlePageChange} />}
    </div>
  );
}

OrdersList.displayName = "OrdersList";