"use client";
import { useCallback, useState } from "react";
import { Order, OrderListResponse, OrderQueryParams } from "../types/order";
import { getMyOrders } from "../actions/orderActions";

export function useMyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<OrderListResponse["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (params: OrderQueryParams = {}) => {
    setIsLoading(true);
    setError(null);

    const result = await getMyOrders(params);

    if (result.success && result.data) {
      setOrders(result.data.data);
      setMeta(result.data.meta);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
    return result;
  }, []);

  const refetch = useCallback(
    async (params: OrderQueryParams = {}) => {
      return fetchOrders(params);
    },
    [fetchOrders],
  );

  return {
    orders,
    meta,
    isLoading,
    error,
    fetchOrders: refetch,
  };
}
