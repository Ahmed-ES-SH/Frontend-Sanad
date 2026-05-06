"use client";

import { FiSend, FiFileText, FiDownload } from "react-icons/fi";

function PaymentActions() {
  const actions = [
    { icon: <FiSend />, labelKey: "sendInvoice" },
    { icon: <FiFileText />, labelKey: "issueRefund" },
    { icon: <FiDownload />, labelKey: "exportCSV" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <button
          key={index}
          className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg text-sm font-medium text-stone-700 border border-stone-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
        >
          <span className="text-orange-600">{action.icon}</span>
          {action.labelKey}
        </button>
      ))}
    </div>
  );
}

export default PaymentActions;
