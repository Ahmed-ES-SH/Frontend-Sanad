/**
 * OrderProgressTracker - Horizontal progress stepper
 */

import type { StatusStep } from "@/app/types/OrderTrackingTable.types";
import StatusStepComponent from "@/app/components/dashboard/OrderDetails/_orderTracking/StatusStep";

interface OrderProgressTrackerProps {
  statusSteps: StatusStep[];
  progressWidth: string;
  statusLabelMap: Record<string, string>;
  isRtl: boolean;
}

export function OrderProgressTracker({
  statusSteps,
  progressWidth,
  statusLabelMap,
  isRtl,
}: OrderProgressTrackerProps) {
  return (
    <div
      className="bg-surface-card-bg rounded-2xl p-6 sm:p-8 mb-8 shadow-surface-sm border border-gray-200"
      role="region"
      aria-label="Order status progress"
    >
      <div className="relative flex items-center justify-between">
        {/* Track Background */}
        <div
          className="absolute top-6 left-0 w-full h-0.5 bg-surface-200 -translate-y-1/2 hidden sm:block"
          aria-hidden="true"
        />
        {/* Active Track */}
        <div
          className="absolute top-6 left-0 h-0.5 bg-primary -translate-y-1/2 hidden sm:block"
          style={{ width: progressWidth }}
          aria-hidden="true"
        />
        {/* Status Steps */}
        <div className="relative flex w-full justify-between">
          {statusSteps.map((step, index) => (
            <StatusStepComponent
              key={step.key}
              step={{
                ...step,
                label: statusLabelMap[step.key] || step.label,
              }}
              index={index}
              isRtl={isRtl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}