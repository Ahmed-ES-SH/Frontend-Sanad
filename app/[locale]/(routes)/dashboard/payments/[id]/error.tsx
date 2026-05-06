"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FiAlertTriangle, FiSearch, FiWifiOff, FiArrowLeft } from "react-icons/fi";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function getErrorDetails(error: Error) {
  const message = error.message.toLowerCase();

  if (message.includes("not found") || message.includes("404")) {
    return {
      icon: <FiSearch size={32} />,
      title: "Transaction not found",
      description:
        "This transaction may have been deleted, or the ID is incorrect. Check the payments list to verify it exists.",
      showReset: false,
    };
  }

  if (message.includes("network") || message.includes("fetch") || message.includes("connection")) {
    return {
      icon: <FiWifiOff size={32} />,
      title: "Connection error",
      description:
        "Unable to reach the server. Check your internet connection and try again.",
      showReset: true,
    };
  }

  if (message.includes("unauthorized") || message.includes("401") || message.includes("403")) {
    return {
      icon: <FiAlertTriangle size={32} />,
      title: "Access denied",
      description:
        "You don't have permission to view this transaction. Contact your administrator if you believe this is an error.",
      showReset: false,
    };
  }

  return {
    icon: <FiAlertTriangle size={32} />,
    title: "Failed to load transaction",
    description:
      "An unexpected error occurred while fetching the payment details. Please try again.",
    showReset: true,
  };
}

export default function PaymentDetailError({ error, reset }: ErrorProps) {
  const params = useParams();
  const locale = params?.local as string;
  const { icon, title, description, showReset } = getErrorDetails(error);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-stone-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-stone-900">{title}</h2>
          <p className="text-sm text-stone-500 max-w-md text-center">
            {description}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {showReset && (
              <button
                onClick={reset}
                className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2"
              >
                Try again
              </button>
            )}
            <Link
              href={`/${locale}/dashboard/payments`}
              className="px-5 py-2.5 bg-stone-100 text-stone-800 rounded-lg text-sm font-semibold hover:bg-stone-200 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2"
            >
              <FiArrowLeft size={14} />
              Back to Payments
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
