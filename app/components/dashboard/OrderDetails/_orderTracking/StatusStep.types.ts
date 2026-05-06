/**
 * Types for StatusStep component - Progress tracker
 */

import type { OrderStatus } from "./OrderTrackingTable.types";

export type StatusStepKey = OrderStatus;

export interface StatusStep {
  key: StatusStepKey;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface StatusStepProps {
  step: StatusStep;
  index: number;
  isRtl: boolean;
}