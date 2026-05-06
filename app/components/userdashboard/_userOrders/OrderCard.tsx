"use client";

import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { STATUS_API_TO_T_KEY } from "./page.types";
import { OrderCardProps, ORDER_CARD_STATUS_STYLES } from "./OrderCard.types";
import LocaleLink from "../../global/LocaleLink";

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  t,
  isRTL,
  index,
  formatOrderId: formatOrderIdFn,
  formatDate: formatDateFn,
  formatAmount: formatAmountFn,
}) => {
  // Map API status to translation key
  const tKey = STATUS_API_TO_T_KEY[order.status] ?? order.status;
  const statusLabel =
    (t.status as Record<string, string>)[tKey] ?? order.status;
  const displayId = formatOrderIdFn(order.id);
  const isInProgress = order.status === "in_progress";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-2xl p-6 shadow-surface-sm flex flex-col border border-surface-200/50 hover:shadow-surface-md transition-all ${
        isInProgress
          ? isRTL
            ? "border-r-4 border-r-primary"
            : "border-l-4 border-l-primary"
          : ""
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6 gap-2">
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-surface-400 uppercase font-display block">
            {displayId}
          </span>
          <h3 className="text-xl font-bold text-surface-900 leading-tight font-display">
            {order.service.title}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${
            ORDER_CARD_STATUS_STYLES[
              order.status as keyof typeof ORDER_CARD_STATUS_STYLES
            ]
          }`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Details */}
      <div className="mt-auto space-y-4">
        <div className="flex justify-between items-center text-sm font-body">
          <span className="text-surface-500">
            {(t.card as Record<string, string>).datePlaced}
          </span>
          <span className="font-semibold text-surface-800">
            {formatDateFn(order.createdAt)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm font-body pb-2">
          <span className="text-surface-500">
            {(t.card as Record<string, string>).amount}
          </span>
          <span className="text-xl font-bold text-primary font-display">
            {formatAmountFn(order.amount, order.currency)}
          </span>
        </div>

        {/* View Details Button */}
        <LocaleLink
          href={`/userdashboard/orders/${order.id}`}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 group active:scale-95 ${
            order.status === "cancelled"
              ? "bg-surface-100 text-surface-700 hover:bg-surface-200"
              : "surface-btn-primary shadow-lg shadow-primary/20"
          }`}
          aria-label={`${(t.card as Record<string, string>).viewDetails} - ${order.service.title}`}
        >
          {order.status === "cancelled"
            ? (t.card as Record<string, string>).viewHistory
            : (t.card as Record<string, string>).viewDetails}
          <FiChevronRight
            className={`text-lg transition-transform group-hover:translate-x-1 ${
              isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
            }`}
          />
        </LocaleLink>
      </div>
    </motion.div>
  );
};

export default OrderCard;
