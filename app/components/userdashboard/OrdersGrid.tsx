"use client";

import type { OrdersGridProps } from "./OrdersGrid.types";

const OrdersGrid: React.FC<OrdersGridProps> = ({ isLoading, children }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
};

export default OrdersGrid;