'use client';

import { useState, FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FiLoader } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";

interface PaymentFormProps {
  clientSecret: string;
  onConfirmed?: (paymentIntentStatus: string | null) => void;
  onError?: (error: string) => void;
}

export function PaymentForm({
  clientSecret,
  onConfirmed,
  onError,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!clientSecret) {
      const message = "Missing payment session. Please restart checkout.";
      setErrorMessage(message);
      onError?.(message);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      const message = error.message || 'Payment failed. Please try again.';
      setErrorMessage(message);
      setIsProcessing(false);
      onError?.(message);
    } else {
      setIsProcessing(false);
      onConfirmed?.(paymentIntent?.status ?? null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <MdErrorOutline className="text-red-500 text-xl shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-3.5 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <FiLoader className="animate-spin text-xl" />
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </button>
    </form>
  );
}
