"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useOrderDetails } from "@/app/hooks/useOrderDetails";
import {
  AccountMetadataCard,
  LogisticsMetadataCard,
  OrderHeader,
  OrderProgressCard,
  ServiceOverviewCard,
  TimelineSidebar,
} from "@/app/components/dashboard/OrderDetails";
import OrderError from "@/app/components/dashboard/OrderDetails/OrderError";
import OrderLoadingSkeleton from "@/app/components/dashboard/OrderDetails/OrderLoading";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const {
    order,
    timeline,
    fetchState,
    submitState,
    updateText,
    statusSelect,
    isUpdatingStatus,
    setUpdateText,
    setStatusSelect,
    handlePostUpdate,
    handleStatusUpdate,
  } = useOrderDetails(orderId);

  // Loading state
  if (fetchState === "loading") {
    return <OrderLoadingSkeleton />;
  }

  // Error state
  if (fetchState === "error" || !order) {
    return <OrderError />;
  }

  // Main render
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-[120vh] pb-20 xl:p-3 p-1"
    >
      {/* Page Header */}
      <OrderHeader
        order={order}
        statusSelect={statusSelect}
        onStatusChange={setStatusSelect}
        onStatusUpdate={handleStatusUpdate}
        isUpdatingStatus={isUpdatingStatus}
      />

      {/* Progress Visualizer */}
      <OrderProgressCard currentStatus={order.status} />

      <div className="grid grid-cols-1 lg:grid-cols-3 h-full gap-8">
        {/* Main Details Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service & Customer Section */}
          <motion.div variants={item}>
            <ServiceOverviewCard order={order} />
          </motion.div>

          {/* Secondary Info: Quick Facts */}
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AccountMetadataCard order={order} />
            <LogisticsMetadataCard order={order} />
          </motion.div>
        </div>

        {/* Timeline Sidebar */}
        <div className="space-y-8 border border-gray-200 rounded-lg shadow-md page-bg sticky top-24 right-0 h-fit xl:max-h-[70vh]">
          <motion.div
            variants={item}
            className="space-y-8 overflow-y-auto h-full"
          >
            <TimelineSidebar
              timeline={timeline}
              submitState={submitState}
              updateText={updateText}
              onUpdateTextChange={setUpdateText}
              onPostUpdate={handlePostUpdate}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
