"use client";

import { motion } from "framer-motion";
import { PaymentLineItem } from "../PaymentsPage/payments-types";

interface PaymentDetailsCardProps {
  merchant: {
    name: string;
    location: string;
  };
  billingCycle: {
    plan: string;
    period: string;
  };
  lineItems: PaymentLineItem[];
  subtotal: number;
  total: number;
  currency: string;
}

export default function PaymentDetailsCard({
  merchant,
  billingCycle,
  lineItems,
  subtotal,
  total,
  currency,
}: PaymentDetailsCardProps) {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  };

  return (
    <motion.section
      className="bg-white rounded-xl border border-stone-200 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
    >
      <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
        <h3 className="text-base font-bold text-stone-900">
          Payment Details
        </h3>
        <span className="text-xs font-medium text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
          Invoice
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-tighter text-stone-400 mb-1">
              Merchant
            </p>
            <p className="font-semibold text-stone-900">{merchant.name}</p>
            <p className="text-sm text-stone-500">{merchant.location}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-tighter text-stone-400 mb-1">
              Billing Cycle
            </p>
            <p className="font-semibold text-stone-900">{billingCycle.plan}</p>
            <p className="text-sm text-stone-500">{billingCycle.period}</p>
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-stone-100">
              <tr>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Item Description
                </th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-stone-500 text-right">
                  Quantity
                </th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-stone-500 text-right">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-200">
              {lineItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-5 py-3 font-medium text-stone-900">
                    {item.description}
                  </td>
                  <td className="px-5 py-3 text-right text-stone-700">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-3 text-right text-stone-700">
                    {formatCurrency(item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-stone-100/60">
              <tr>
                <td
                  className="px-5 py-3 text-right font-semibold text-stone-500"
                  colSpan={2}
                >
                  Subtotal
                </td>
                <td className="px-5 py-3 text-right font-semibold text-stone-900">
                  {formatCurrency(subtotal)}
                </td>
              </tr>
              <tr className="bg-orange-50">
                <td
                  className="px-5 py-3 text-right font-black text-orange-600"
                  colSpan={2}
                >
                  Total Paid
                </td>
                <td className="px-5 py-3 text-right font-black text-orange-600 text-lg">
                  {formatCurrency(total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </motion.section>
  );
}
