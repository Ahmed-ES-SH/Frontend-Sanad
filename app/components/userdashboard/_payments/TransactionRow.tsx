"use client";

import { ReactNode } from "react";
import { FiFileText, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { TransactionRowProps, TransactionData } from "./TransactionRow.types";
import { useTranslation } from "@/app/hooks/useTranslation";

const ICONS = {
  paid: <FiCheckCircle className="text-[10px] mr-1" />,
  pending: <FiClock className="text-[10px] mr-1" />,
  failed: <FiXCircle className="text-[10px] mr-1" />,
};

const STATUS_STYLES = {
  paid: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
};

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  statusConfig,
  onRetryPayment,
}) => {
  const t = useTranslation("payments");
  const { status, description, subtitle, amount, date, time, id, errorReason } =
    transaction;

  const config = statusConfig[status];
  const IconComponent = ICONS[status];

  return (
    <tr className="hover:bg-stone-50 transition-colors group">
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <p className="text-sm font-semibold text-foreground">{date}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </td>
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center text-stone-500 shrink-0"
            aria-hidden="true"
          >
            {transaction.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate max-w-[150px] sm:max-w-[200px]">
              {description}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-[200px]">
              {subtitle}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <p className="text-sm font-bold text-foreground">{amount}</p>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase ${STATUS_STYLES[status]}`}
        >
          {IconComponent}
          {config.label}
        </span>
        {errorReason && (
          <p className="text-xs text-red-600 mt-1">{errorReason}</p>
        )}
      </td>
      <td className="px-4 py-4 sm:px-6 text-right whitespace-nowrap">
        {status === "failed" ? (
          <button
            className="px-3 py-1.5 text-xs font-semibold text-orange-600 border border-orange-600/20 rounded-lg hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label={t.actions.retryAria.replace("{{description}}", description)}
            onClick={() => onRetryPayment?.(id)}
          >
            {t.actions.retry}
          </button>
        ) : (
          <button
            className="p-2 text-muted-foreground hover:text-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            aria-label={t.actions.downloadAria.replace("{{description}}", description)}
          >
            <FiFileText />
          </button>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;