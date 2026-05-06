"use client";

interface PaymentSummaryProps {
  label: string;
  amount: string;
}

export function PaymentSummary({ label, amount }: PaymentSummaryProps) {
  return (
    <div className="p-5 bg-gradient-to-br from-surface-50 to-surface-100 rounded-xl border border-surface-card-border flex items-center justify-between">
      <span className="text-stone-600 font-medium">{label}</span>
      <span className="text-3xl font-bold text-primary font-display">
        {amount}
      </span>
    </div>
  );
}
