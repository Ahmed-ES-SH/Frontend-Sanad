"use client";

import { useState, useMemo, useEffect } from "react";
import {
  FiAlertCircle,
  FiRefreshCw,
  FiLoader,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

import { FilterStatus } from "./TransactionTable.types";
import FilterBar from "./FilterBar";
import TransactionTableHeader from "./TransactionTableHeader";
import TransactionRow from "./TransactionRow";
import TransactionPagination from "./TransactionPagination";
import EmptyState from "./EmptyState";
import { Messages } from "@/app/hooks/useTranslation";
import { Transaction, TransactionStatus } from "@/app/types/payments";
import { transformPaymentToTransaction } from "@/app/helpers/_payments/transformPayment.helper";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { PAYMENTS_ENDPOINTS } from "@/app/constants/endpoints";
import { PaginatedPaymentsResponse } from "@/app/types/payments";

interface TransactionTableProps {
  t: Messages["payments"];
  initialData?: PaginatedPaymentsResponse;
}

export default function TransactionTable({
  t,
  initialData,
}: TransactionTableProps) {
  const statusConfig: Record<
    TransactionStatus,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    paid: {
      label: t.status.paid,
      className: "bg-green-50 text-green-700",
      icon: <FiCheckCircle className="text-[10px] mr-1" />,
    },
    pending: {
      label: t.status.pending,
      className: "bg-amber-50 text-amber-700",
      icon: <FiClock className="text-[10px] mr-1" />,
    },
    failed: {
      label: t.status.failed,
      className: "bg-red-50 text-red-700",
      icon: <FiXCircle className="text-[10px] mr-1" />,
    },
  };

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  // Check if we are in the initial server-rendered state
  const isInitialState =
    currentPage === 1 &&
    statusFilter === "all" &&
    dateFrom === "" &&
    dateTo === "";

  // Status to API status mapping
  const getApiStatus = (filter: FilterStatus): string | undefined => {
    if (filter === "all") return undefined;
    return filter === "paid" ? "succeeded" : filter;
  };

  // API status conversion
  const apiStatus = getApiStatus(statusFilter);

  // Construct query params for useAppQuery
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(currentPage));
    params.set("limit", "10");
    if (apiStatus) params.set("status", apiStatus);
    if (dateFrom) params.set("startDate", dateFrom);
    if (dateTo) params.set("endDate", dateTo);
    return params.toString();
  }, [currentPage, apiStatus, dateFrom, dateTo]);

  const endpoint = `${PAYMENTS_ENDPOINTS.USER_LIST}${queryParams ? `?${queryParams}` : ""}`;

  // Fetch payments using useAppQuery
  const {
    data: queryResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useAppQuery<PaginatedPaymentsResponse, Error>({
    queryKey: ["payments", { currentPage, apiStatus, dateFrom, dateTo }],
    endpoint,
    enabled: true,
    options: {
      ...(isInitialState && initialData ? { initialData } : {}),
    },
  });

  const effectiveData = queryResponse ?? initialData;

  const apiPayments = effectiveData?.data ?? [];
  const meta = effectiveData?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const total = meta?.total ?? 0;
  const hasNextPage = (meta?.page ?? 1) < totalPages;
  const hasPrevPage = (meta?.page ?? 1) > 1;

  // Transform API payments to Transaction format
  const transactions: Transaction[] = useMemo(() => {
    return apiPayments.map(transformPaymentToTransaction);
  }, [apiPayments]);

  // Reset to page 1 when filters change
  useEffect(() => {
    function handlePage(newPage: number) {
      setCurrentPage(newPage);
    }
    handlePage(1);
  }, [statusFilter, dateFrom, dateTo]);

  // Filter transactions client-side (for search)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Text search
      const matchesSearch =
        searchQuery === "" ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter (server-side but keep for consistency)
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;

      // Date range filter
      let matchesDate = true;
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        matchesDate = matchesDate && t.timestamp >= fromDate;
      }
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && t.timestamp <= toDate;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [transactions, searchQuery, statusFilter, dateFrom, dateTo]);

  // Filter count
  const hasActiveFilters =
    statusFilter !== "all" ||
    dateFrom !== "" ||
    dateTo !== "" ||
    searchQuery !== "";

  const activeFilterCount =
    (statusFilter !== "all" ? 1 : 0) +
    (dateFrom !== "" ? 1 : 0) +
    (dateTo !== "" ? 1 : 0);

  // Handlers
  const clearAllFilters = () => {
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRetry = () => {
    setRefreshKey((prev) => prev + 1);
    refetch();
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-stone-200/50 overflow-hidden">
        <div className="p-6 border-b border-stone-200/50">
          <h2 className="text-xl font-semibold text-foreground">
            {t.tableTitle}
          </h2>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <FiLoader className="animate-spin text-xl" />
            <span>{t.loadingText}</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-stone-200/50 overflow-hidden">
        <div className="p-6 border-b border-stone-200/50">
          <h2 className="text-xl font-semibold text-foreground">
            {t.tableTitle}
          </h2>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <FiAlertCircle className="text-4xl text-red-500" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {t.loadFailed}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {error.message || t.tryAgainLater}
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-600 border border-orange-600/20 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <FiRefreshCw className="text-sm" />
              {t.tryAgainLabel}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-stone-200/50 overflow-hidden">
      {/* Header & Filters */}
      <div className="p-6 border-b border-stone-200/50">
        <FilterBar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          dateFrom={dateFrom}
          dateTo={dateTo}
          activeFilterCount={activeFilterCount}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onClearFilters={clearAllFilters}
        />
      </div>

      {/* Table - Responsive with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <TransactionTableHeader />
          <tbody className="divide-y divide-stone-200/50">
            {filteredTransactions.length === 0 ? (
              <EmptyState
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearAllFilters}
              />
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  statusConfig={statusConfig}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        filteredCount={filteredTransactions.length}
        onPageChange={handlePageChange}
        onPreviousPage={() => handlePageChange(currentPage - 1)}
        onNextPage={() => handlePageChange(currentPage + 1)}
      />
    </section>
  );
}
