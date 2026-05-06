"use client";

export function OrdersLoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
    </div>
  );
}

OrdersLoadingState.displayName = "OrdersLoadingState";