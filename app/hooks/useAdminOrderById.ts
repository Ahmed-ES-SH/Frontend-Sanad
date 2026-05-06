"use client";
import { useCallback, useState } from "react";
import { AdminOrder } from "../types/order";
import { getAdminOrderById } from "../actions/orderActions";

export function useAdminOrderById(orderId: string | null) {
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await getAdminOrderById(id);

    if (result.success && result.data) {
      setOrder(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
    return result;
  }, []);

  // Fetch order on mount if orderId is provided
  useState(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  });

  return {
    order,
    isLoading,
    error,
    fetchOrder,
  };
}
