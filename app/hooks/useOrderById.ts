import { useCallback, useState } from "react";
import { getOrderById } from "../actions/orderActions";
import { Order } from "../types/order";

export function useOrderById(orderId: string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await getOrderById(id);

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
