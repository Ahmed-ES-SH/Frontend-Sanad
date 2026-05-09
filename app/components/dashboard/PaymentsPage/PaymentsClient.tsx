"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import {
  PaginatedPaymentsResponse,
  PaymentStatistics,
  PaymentStatus,
} from "@/app/types/payments";
import TransactionTable from "@/app/components/dashboard/PaymentsPage/TransactionTable";
import StatsGrid from "@/app/components/dashboard/PaymentsPage/StatsGrid";
import PaymentDetailModal from "@/app/components/dashboard/PaymentsPage/PaymentDetailModal";

interface PaymentsClientProps {
  initialData: PaginatedPaymentsResponse | null;
  paymentStats: PaymentStatistics | null;
}

export default function PaymentsClient({
  initialData,
  paymentStats,
}: PaymentsClientProps) {
  const t = useTranslation("PaymentsPage");

  // Filter state
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "">("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal state
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  // Construct query endpoint
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));
  if (statusFilter) queryParams.set("status", statusFilter);

  const endpoint = `/api/admin/payments?${queryParams.toString()}`;

  // Fetch payments using useAppQuery
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useAppQuery<PaginatedPaymentsResponse>({
    queryKey: ["admin-payments", page, statusFilter],
    endpoint,
    options: {
      // Use initialData for the very first render if we are on page 1 with no filters
      initialData:
        page === 1 && !statusFilter && initialData ? initialData : undefined,
    },
  });

  const responseData = queryData || initialData;
  const payments = responseData?.data || [];
  const meta = responseData?.meta || null;

  const handleRowClick = useCallback((paymentId: string) => {
    setSelectedPaymentId(paymentId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPaymentId(null);
  }, []);

  const handleRefundSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const Filters = [
    { value: "", label: t.PaymentFilters.statusAll },
    { value: "succeeded", label: t.PaymentFilters.success },
    { value: "pending", label: t.PaymentFilters.pending },
    { value: "failed", label: t.PaymentFilters.failed },
    { value: "refunded", label: "Refunded" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <main className="flex-1 p-6 md:p-8 space-y-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-3xl text-stone-900 flex  gap-2">
              <span>{t.PaymentsHeader.title.split(" ")[0]}</span>
              <span className="text-primary font-bold italic font-serif text-4xl underline">
                {t.PaymentsHeader.title.split(" ")[1]}
              </span>
            </div>
            <p className="text-stone-500 mt-1">{t.PaymentsHeader.subtitle}</p>
          </div>
        </div>

        {/* Stats Grid */}
        {paymentStats && (
          <StatsGrid
            total={paymentStats.total}
            succeeded={paymentStats.succeeded}
            pending={paymentStats.pending}
            refunded={paymentStats.refunded}
            failed={paymentStats.failed}
            partiallyRefunded={paymentStats.partiallyRefunded}
          />
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {Filters.map((status) => (
            <button
              key={status.value}
              onClick={() => {
                setStatusFilter(status.value as PaymentStatus | "");
                setPage(1);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 border ${
                statusFilter === status.value
                  ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-100"
                  : "bg-white text-stone-600 border-stone-200 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        {/* Transactions Table */}
        <TransactionTable
          payments={payments}
          isLoading={isLoading && !responseData}
          error={error}
          onRowClick={handleRowClick}
          onRetry={refetch}
          meta={meta}
          onPageChange={handlePageChange}
        />
      </main>

      {/* Payment Detail Modal */}
      <PaymentDetailModal
        isOpen={!!selectedPaymentId}
        onClose={handleCloseModal}
        paymentId={selectedPaymentId || ""}
        onRefundSuccess={handleRefundSuccess}
      />
    </div>
  );
}
