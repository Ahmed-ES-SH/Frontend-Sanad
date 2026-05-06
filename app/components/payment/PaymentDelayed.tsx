"use client";

interface PaymentDelayedProps {
  title: string;
  description: string;
  buttonText: string;
  onCheckAgain: () => void;
}

export function PaymentDelayed({
  title,
  description,
  buttonText,
  onCheckAgain,
}: PaymentDelayedProps) {
  return (
    <div className="text-center py-10 space-y-4">
      <h3 className="text-2xl font-bold text-stone-900 font-display">{title}</h3>
      <p className="text-stone-500 font-medium">{description}</p>
      <button
        onClick={onCheckAgain}
        className="mt-2 w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-surface-sm"
      >
        {buttonText}
      </button>
    </div>
  );
}
