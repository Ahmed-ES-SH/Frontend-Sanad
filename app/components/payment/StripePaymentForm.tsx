"use client";

import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";

interface StripePaymentFormProps {
  stripePromise: Promise<Stripe | null> | null;
  clientSecret: string;
  configMissingLabel: string;
  onConfirmed: (paymentIntentStatus: string | null) => void;
  onError: (error: string) => void;
}

export function StripePaymentForm({
  stripePromise,
  clientSecret,
  configMissingLabel,
  onConfirmed,
  onError,
}: StripePaymentFormProps) {
  if (!stripePromise) {
    return (
      <div className="text-center py-8">
        <p className="text-stone-500 font-medium">{configMissingLabel}</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#f97316", // Sanad primary orange
            colorBackground: "#ffffff",
            colorText: "#1c1917", // stone-900
            colorDanger: "#ef4444",
            fontFamily: "Inter, system-ui, sans-serif",
            spacingUnit: "4px",
            borderRadius: "8px",
          },
          rules: {
            ".Input": {
              border: "1px solid #e7e5e4", // stone-200
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            },
            ".Input:focus": {
              border: "1px solid #f97316",
              boxShadow: "0 0 0 1px #f97316",
            },
            ".Label": {
              color: "#57534e", // stone-500
              fontWeight: "500",
            },
          },
        },
      }}
    >
      <PaymentForm
        clientSecret={clientSecret}
        onConfirmed={onConfirmed}
        onError={onError}
      />
    </Elements>
  );
}
