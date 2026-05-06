/**
 * Loading skeleton for order tracking page
 */

const OrderTrackingLoading = () => {
  return (
    <div
      className="min-h-screen pb-12 page-bg"
      aria-busy="true"
      aria-label="Loading order details"
    >
      <div className="c-container pt-8">
        {/* Header Skeleton */}
        <div className="h-5 w-32 bg-surface-200 rounded-lg mb-6 animate-pulse" />
        <div className="h-9 w-56 bg-surface-200 rounded-lg mb-3 animate-pulse" />
        <div className="h-5 w-80 bg-surface-200 rounded mb-10 animate-pulse" />

        {/* Progress Tracker Skeleton */}
        <div className="h-28 w-full bg-surface-100 rounded-2xl mb-10 animate-pulse" />

        {/* Bento Grid Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-56 w-full bg-surface-100 rounded-2xl animate-pulse" />
            <div className="h-80 w-full bg-surface-100 rounded-2xl animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-44 w-full bg-surface-100 rounded-2xl animate-pulse" />
            <div className="h-36 w-full bg-surface-100 rounded-2xl animate-pulse" />
            <div className="h-32 w-full bg-surface-100 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingLoading;