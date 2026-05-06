"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { useState } from "react";
import { MdCheck, MdCreditCard, MdAccountBalance } from "react-icons/md";

interface PaymentMethodSelectorProps {
  onMethodChange?: (method: "credit_card" | "bank_transfer") => void;
}

export function PaymentMethodSelector({
  onMethodChange,
}: PaymentMethodSelectorProps) {
  const t = useTranslation("cart");
  const [selectedMethod, setSelectedMethod] = useState<
    "credit_card" | "bank_transfer"
  >("credit_card");

  const handleMethodSelect = (method: "credit_card" | "bank_transfer") => {
    setSelectedMethod(method);
    onMethodChange?.(method);
  };

  return (
    <div className="mb-6">
      <label className="text-xs font-bold uppercase tracking-wide text-(--on-surface-variant) mb-4 block">
        {t.paymentMethod}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleMethodSelect("credit_card")}
          className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 group ${
            selectedMethod === "credit_card"
              ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
              : "border-(--outline-variant)/30 hover:border-primary/40 bg-(--surface-container-lowest) hover:shadow-lg hover:shadow-black/5"
          }`}
        >
          {selectedMethod === "credit_card" && (
            <span className="absolute top-2.5 end-2.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
              <MdCheck className="text-xs text-white" />
            </span>
          )}
          <div
            className={`p-2 rounded-lg transition-colors ${selectedMethod === "credit_card" ? "bg-primary/10" : "bg-(--surface-container)"}`}
          >
            <MdCreditCard
              className={`text-2xl md:text-3xl transition-colors duration-300 ${selectedMethod === "credit_card" ? "text-primary" : "text-(--on-surface-variant)"}`}
            />
          </div>
          <span
            className={`text-xs font-bold transition-colors duration-300 ${selectedMethod === "credit_card" ? "text-(--on-surface)" : "text-(--on-surface-variant)"}`}
          >
            {t.creditCard}
          </span>
        </button>
        <button
          type="button"
          onClick={() => handleMethodSelect("bank_transfer")}
          className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 group ${
            selectedMethod === "bank_transfer"
              ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
              : "border-(--outline-variant)/30 hover:border-primary/40 bg-(--surface-container-lowest) hover:shadow-lg hover:shadow-black/5"
          }`}
        >
          {selectedMethod === "bank_transfer" && (
            <span className="absolute top-2.5 end-2.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
              <MdCheck className="text-xs text-white" />
            </span>
          )}
          <div
            className={`p-2 rounded-lg transition-colors ${selectedMethod === "bank_transfer" ? "bg-primary/10" : "bg-(--surface-container)"}`}
          >
            <MdAccountBalance
              className={`text-2xl md:text-3xl transition-colors duration-300 ${selectedMethod === "bank_transfer" ? "text-primary" : "text-(--on-surface-variant)"}`}
            />
          </div>
          <span
            className={`text-xs font-bold transition-colors duration-300 ${selectedMethod === "bank_transfer" ? "text-(--on-surface)" : "text-(--on-surface-variant)"}`}
          >
            {t.bankTransfer}
          </span>
        </button>
      </div>
    </div>
  );
}
