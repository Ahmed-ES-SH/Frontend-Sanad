"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotificationsErrorBoundary({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    // Log to monitoring service in production
    console.error("Notifications page error:", error);
  }, [error]);

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mb-6">
          <FiAlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-surface-500 text-sm max-w-md mb-2">
          We encountered an error while loading the notifications page. Please
          try again.
        </p>
        {process.env.NODE_ENV === "development" && (
          <p className="text-xs text-red-400 font-mono bg-red-50 px-3 py-1.5 rounded-lg mb-6 max-w-lg truncate">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </main>
  );
}
