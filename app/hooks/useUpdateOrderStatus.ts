"use client";
import { useCallback, useState } from "react";
import { updateOrderStatus } from "../actions/orderActions";
import { UseCreateOrderState } from "../types/order";

export function useUpdateOrderStatus() {
  const [state, setState] = useState<UseCreateOrderState>({
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async (id: string, status: string) => {
    setState({ isLoading: true, error: null });

    const result = await updateOrderStatus(id, status);

    if (!result.success) {
      setState({ isLoading: false, error: result.message });
    } else {
      setState({ isLoading: false, error: null });
    }

    return result;
  }, []);

  return {
    ...state,
    updateStatus: execute,
  };
}
