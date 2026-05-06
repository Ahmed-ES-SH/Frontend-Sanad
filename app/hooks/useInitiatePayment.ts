import { useCallback, useState } from "react";
import {
  OrderActionResult,
  PaymentIntentResponse,
  UseCreateOrderState,
} from "../types/order";
import { initiatePayment } from "../actions/orderActions";

export function useInitiatePayment() {
  const [state, setState] = useState<UseCreateOrderState>({
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (
      orderId: string,
    ): Promise<OrderActionResult<PaymentIntentResponse>> => {
      setState({ isLoading: true, error: null });

      const result = await initiatePayment(orderId);

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
    initiatePayment: execute,
  };
}
