import React from "react";
import { FiEye, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { PaymentResponseDto } from "@/app/types/payments";
import { PaginationMeta } from "@/app/types/global";
import TransactionPagination from "./TransactionPagination";

interface TransactionTableProps {
  payments: PaymentResponseDto[] | null;
  isLoading: boolean;
  error: unknown;
  onRowClick: (paymentId: string) => void;
  onRetry: () => void;
  meta: PaginationMeta | null;
  onPageChange: (newPage: number) => void;
}

const statusColors = {
  succeeded: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  failed: "bg-red-100 text-red-700 border-red-200",
  refunded: "bg-stone-100 text-stone-700 border-stone-200",
  partially_refunded: "bg-stone-100 text-stone-700 border-stone-200",
};

const formatAmount = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
};

export default function TransactionTable({
  payments,
  isLoading,
  error,
  onRowClick,
  onRetry,
  meta,
  onPageChange,
}: TransactionTableProps) {
  if (error) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-red-100 text-center">
        <p className="text-red-600 mb-4">Failed to load payments.</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Payment ID</th>
              <th className="px-6 py-4 whitespace-nowrap">Date</th>
              <th className="px-6 py-4 whitespace-nowrap">Amount</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">User ID</th>
              <th className="px-6 py-4 whitespace-nowrap text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {isLoading ? (
              // Loading Skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse bg-white">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-stone-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-stone-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-stone-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-stone-200 rounded-full w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-stone-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-stone-200 rounded w-8 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : !payments || payments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-stone-500"
                >
                  No payments found matching your criteria.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={payment.id}
                  className="hover:bg-stone-50 transition-colors cursor-pointer"
                  onClick={() => onRowClick(payment.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-900">
                    <span title={payment.id}>...{payment.id.slice(-8)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(payment.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {formatAmount(payment.amount, payment.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${
                        statusColors[payment.status] || statusColors.pending
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                        <FiUser className="w-3 h-3" />
                      </div>
                      <span className="truncate max-w-[150px]">
                        {payment.userId ? payment.userId : "Fake"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      className="p-2 text-stone-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      aria-label="View Details"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(payment.id);
                      }}
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {meta && meta.lastPage > 1 && (
        <TransactionPagination meta={meta} onPageChange={onPageChange} />
      )}
    </div>
  );
}
