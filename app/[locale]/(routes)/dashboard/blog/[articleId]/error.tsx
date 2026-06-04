"use client";

import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ArticleDetailsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Article details error:", error);
  }, [error]);

  return (
    <main className="min-h-screen pt-8 pb-20">
      <div className="c-container">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <FiAlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-stone-900 mb-2">
            Failed to load article
          </h2>
          <p className="text-stone-500 max-w-md mb-6">
            Something went wrong while loading this article. Please try again.
          </p>
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
