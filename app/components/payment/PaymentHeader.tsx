"use client";

import { MdClose } from "react-icons/md";
import { FaLock } from "react-icons/fa";

interface PaymentHeaderProps {
  title: string;
  paymentIdLabel: string;
  paymentId: string;
  onClose: () => void;
}

export function PaymentHeader({
  title,
  paymentIdLabel,
  paymentId,
  onClose,
}: PaymentHeaderProps) {
  return (
    <div className="px-6 py-5 border-b border-surface-card-border flex items-center justify-between bg-surface-50">
      <div>
        <h2 className="text-xl font-bold text-stone-900 font-display">
          {title}
        </h2>
        <p className="text-sm font-medium text-stone-500 mt-1 flex items-center gap-1.5">
          <FaLock className="text-xs" /> {paymentIdLabel}
          {paymentId.slice(0, 8)}
        </p>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
      >
        <MdClose className="text-xl" />
      </button>
    </div>
  );
}
