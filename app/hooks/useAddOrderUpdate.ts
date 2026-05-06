"use client";
import { useCallback, useState } from "react";
import { addOrderUpdate } from "../actions/orderActions";
import { UseCreateOrderState } from "../types/order";

export function useAddOrderUpdate() {
  const [state, setState] = useState<UseCreateOrderState>({
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async (id: string, content: string) => {
    setState({ isLoading: true, error: null });

    const result = await addOrderUpdate(id, content);

    if (!result.success) {
      setState({ isLoading: false, error: result.message });
    } else {
      setState({ isLoading: false, error: null });
    }

    return result;
  }, []);

  return {
    ...state,
    addUpdate: execute,
  };
}
