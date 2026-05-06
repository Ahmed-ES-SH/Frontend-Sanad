"use client";

interface PaymentProcessingProps {
  title: string;
  description: string;
}

export function PaymentProcessing({
  title,
  description,
}: PaymentProcessingProps) {
  return (
    <div className="text-center py-16">
      <div className="w-10 h-10 border-4 border-stone-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <h3 className="text-xl font-bold text-stone-900 mb-2 font-display">
        {title}
      </h3>
      <p className="text-stone-500 font-medium">{description}</p>
    </div>
  );
}
