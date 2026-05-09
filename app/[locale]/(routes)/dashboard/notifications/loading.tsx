import { FiLoader } from "react-icons/fi";

export default function NotificationsLoading() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FiLoader className="w-8 h-8 text-primary animate-spin" />
        <p className="mt-4 text-sm text-surface-500 font-medium">
          Loading notifications...
        </p>
      </div>
    </main>
  );
}
