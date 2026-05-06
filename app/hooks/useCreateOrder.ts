// ============================================================================
// USER ORDER HOOKS
// ============================================================================

import { useCallback, useState } from "react";
import { Order, OrderActionResult } from "../types/order";
import { createOrder } from "../actions/orderActions";

interface UseCreateOrderState {
  isLoading: boolean;
  error: string | null;
}

export function useCreateOrder() {
  const [state, setState] = useState<UseCreateOrderState>({
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (
      serviceId: string,
      notes?: string,
    ): Promise<OrderActionResult<Order>> => {
      setState({ isLoading: true, error: null });

      const result = await createOrder(serviceId, notes);

      if (!result.success) {
        setState({ isLoading: false, error: result.message });
      } else {
        setState({ isLoading: false, error: null });
      }

      return result;
    },
    [],
  );

  return {
    ...state,
    createOrder: execute,
  };
}
