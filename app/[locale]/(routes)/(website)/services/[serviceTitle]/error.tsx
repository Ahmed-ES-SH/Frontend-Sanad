"use client";

// Error component
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary-text mb-4">
          Something went wrong!
        </h2>
        <p className="text-primary-text/80 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary-text text-white rounded hover:bg-primary-text/90 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
