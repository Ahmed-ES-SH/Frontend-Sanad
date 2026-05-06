"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiPieChart,
  FiCreditCard,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import { PaginatedPaymentsResponse, PaymentStatus } from "@/app/types/payments";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import TransactionTable from "@/app/components/dashboard/PaymentsPage/TransactionTable";
import PaymentDetailModal from "@/app/components/dashboard/PaymentsPage/PaymentDetailModal";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface PaymentsClientProps {
  initialData: PaginatedPaymentsResponse | null;
}



export default function PaymentsClient({ initialData }: PaymentsClientProps) {
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
        page === 1 && !statusFilter && initialData
          ? initialData
          : undefined,
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

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <main className="flex-1 p-6 md:p-8 space-y-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 font-display">
              {t.PaymentsHeader.title}
            </h1>
            <p className="text-stone-500 mt-1">{t.PaymentsHeader.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors shadow-sm text-sm font-medium">
              <FiFilter className="w-4 h-4" />
              {t.PaymentFilters.statusAll}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors shadow-md shadow-orange-200 text-sm font-medium">
              <FiDollarSign className="w-4 h-4" />
              {t.PaymentActions.sendInvoice}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Stats are kept as display-only since backend doesn't provide stats endpoint yet */}
          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <FiDollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                {t.PaymentStats.totalRevenue}
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                {meta ? `${meta.total || 0} payments` : "—"}
              </h3>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <FiCreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                {t.PaymentStats.activeSubscriptions}
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                {meta ? `${meta.totalPages || 0} pages` : "—"}
              </h3>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <FiTrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                {t.PaymentStats.netVolume}
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                {payments ? payments.length : 0}
              </h3>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <FiPieChart className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                {t.PaymentStats.avgTicketSize}
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                {payments && payments.length > 0
                  ? `$${(payments.reduce((sum, p) => sum + p.amount, 0) / payments.length).toFixed(2)}`
                  : "—"}
              </h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { value: "", label: t.PaymentFilters.statusAll },
            { value: "succeeded", label: t.PaymentFilters.success },
            { value: "pending", label: t.PaymentFilters.pending },
            { value: "failed", label: t.PaymentFilters.failed },
            { value: "refunded", label: "Refunded" },
          ].map((status) => (
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
