"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  FiClock,
  FiDollarSign,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";

import {
  OrderManagement,
  OrdersTable,
} from "@/app/components/dashboard/AdminOrdersPage";
import { FilterBar } from "@/app/components/dashboard/OrdersPage/FilterBar";
import { PageHeader } from "@/app/components/dashboard/OrdersPage/PageHeader";
import { StatsCards, StatCard } from "@/app/components/dashboard/OrdersPage/StatsCards";

export default function AdminOrdersPage() {
  const t = useTranslation("DashOrdersPage");

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const stats: StatCard[] = [
    {
      label: t.stats?.total || "Total Orders",
      value: "1,284",
      change: "+12%",
      icon: <FiShoppingBag className="w-5 h-5" />,
      accent: "text-primary",
      accentBorder: "border-primary",
    },
    {
      label: t.stats?.pending || "Pending",
      value: "42",
      change: "Needs attention",
      icon: <FiClock className="w-5 h-5" />,
      accent: "text-[var(--accent-amber)]",
      accentBorder: "border-[var(--accent-amber)]",
    },
    {
      label: t.stats?.revenue || "Revenue",
      value: "$142.5K",
      change: "+8.4%",
      icon: <FiDollarSign className="w-5 h-5" />,
      accent: "text-accent-emerald",
      accentBorder: "border-accent-emerald",
    },
    {
      label: t.stats?.avgValue || "Avg. Order Value",
      value: "$310",
      change: "Stable",
      icon: <FiTrendingUp className="w-5 h-5" />,
      accent: "text-accent-cyan",
      accentBorder: "border-accent-cyan",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      <main className="flex-1 p-6 lg:p-8 space-y-6 w-full">
        <AnimatePresence mode="wait">
          {!selectedOrderId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <PageHeader
                title={t.title || "Orders"}
                description={t.description}
              />

              <StatsCards stats={stats} />

              <FilterBar
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />

              <div className="bg-surface-card-bg rounded-xl shadow-surface-sm">
                <OrdersTable
                  onViewOrder={setSelectedOrderId}
                  statusFilter={statusFilter}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <OrderManagement
                orderId={selectedOrderId}
                onBack={() => setSelectedOrderId(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}