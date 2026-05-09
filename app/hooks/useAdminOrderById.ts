"use client";
import { useCallback, useEffect, useState } from "react";
import { AdminOrder } from "../types/order";
import { getAdminOrderById } from "../actions/orderActions";

export function useAdminOrderById(orderId: string | null) {
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchOrder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await getAdminOrderById(id);

    if (result.success && result.data) {
      setOrder(result.data);
      setIsInitialLoad(false);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
    return result;
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId, fetchOrder]);

  return {
    order,
    isLoading,
    error,
    isInitialLoad,
    fetchOrder,
  };
}
