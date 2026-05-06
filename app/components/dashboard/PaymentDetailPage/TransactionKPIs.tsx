import { FiCheckCircle, FiCreditCard } from "react-icons/fi";

interface TransactionKPIsProps {
  amount: number;
  currency: string;
  netVolume: number;
  processingFeePercent: number;
  status: "success" | "pending" | "failed" | "refunded";
  method: {
    brand: string;
    last4: string;
  };
}

export default function TransactionKPIs({
  amount,
  currency,
  netVolume,
  processingFeePercent,
  status,
  method,
}: TransactionKPIsProps) {
  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedNetVolume = netVolume.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Amount */}
      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Amount
        </p>
        <p className="text-xl font-bold text-stone-900">
          {formattedAmount}{" "}
          <span className="text-sm font-medium text-stone-500">{currency}</span>
        </p>
      </div>

      {/* Net Volume */}
      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Net Volume
        </p>
        <p className="text-xl font-bold text-stone-900">
          {formattedNetVolume}{" "}
          <span className="text-sm font-medium text-stone-500">{currency}</span>
        </p>
        <p className="text-[10px] text-orange-600 font-semibold mt-1">
          After {processingFeePercent}% Processing Fee
        </p>
      </div>

      {/* Status */}
      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Status
        </p>
        <div
          className={`flex items-center gap-2 font-semibold text-sm ${
            status === "success"
              ? "text-emerald-600"
              : status === "pending"
                ? "text-amber-600"
                : status === "failed"
                  ? "text-red-600"
                  : "text-stone-600"
          }`}
          role="status"
          aria-label={`Payment status: ${status}`}
        >
          <FiCheckCircle size={16} aria-hidden="true" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>

      {/* Method */}
      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Method
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-6 bg-stone-100 rounded border border-stone-200 flex items-center justify-center overflow-hidden">
            <FiCreditCard size={14} className="text-stone-500" />
          </div>
          <p className="text-stone-900 font-semibold text-sm">
            {method.brand}{" "}
            <span className="text-stone-500 font-medium">
              •••• {method.last4}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
