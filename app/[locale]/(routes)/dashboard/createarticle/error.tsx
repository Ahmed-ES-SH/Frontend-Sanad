"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("[CreateArticlePage Error]", error);
  }, [error]);

  return (
    <main className="pt-24 pb-12 px-8 min-h-screen bg-stone-50 text-stone-900 flex flex-col items-center justify-center">
      <div className="max-w-md text-center space-y-6">
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-display text-stone-900">
            Unable to create article
          </h2>
          <p className="text-stone-500 mt-2">
            {error.message || "Something went wrong."}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/dashboard/blog")}
            className="px-6 py-2.5 bg-stone-100 text-stone-700 font-semibold rounded-lg hover:bg-stone-200 transition-colors"
          >
            Back to Blog
          </button>
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}